const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');

const Contact=require('./models/contact');

const app=express();

var contactList=[
    {
        name:'Alok Maurya',
        phone:'123456'
    },
    {
        name:'Alka',
        phone:'9863571'
    },
    {
        name:'Ankita',
        phone:'76078521'
    }
];

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){
    // console.log(req);
    // res.send("<h1>Cool,It is working</h1>");
    // console.log(__dirname); //  gives the latest directory
   
    Contact.find({},function(err,contact_fetch){
        if(err){
            console.log('Error in fetching contact');
            return;
        }
        return res.render('home',{
            title:" My Contact",
            contact_list:contact_fetch
        });
    });

   
});    

// app.get('/delete-button/:phone',function(req,res){
    app.get('/delete-button',function(req,res){
    // let phone=req.params.phone;  get data when using without db

    // let contactIndex=contactList.findIndex(contact=>contact.phone==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }


// get the id from query in the url
    let id=req.query.id;
// find the contact in the database using id and delete
     
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting obj');
            return;
        }
        return res.redirect('back');
    });
});



app.get('/profile',function(req,res){
    return res.render('profile',{
        title:"let us play with EJS"
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
   console.log(req.body);


    // contactList.push(req.body);  /// it is  used when there is no DB

     Contact.create({
         name:req.body.name,
        phone: req.body.phone
     },function(err,newContact){
              if(err){
                  console.log('err in creating contact');
                  return;
                }
                console.log('**********',newContact);
                return res.redirect('back');
     });

    // return res.redirect('back'); /// it is  used when there is no DB
});

app.listen(port,function(err){
    if(err){
        console.log('Error',port);
    }
    console.log('It is working...');
})