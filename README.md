In this repo we will be practicing backend and i'll try to add the JS and backend notes ....

command pallete --> add dev container --> node js and ja
let                      var                             const 
Used now (variable)      not used now due to scope prob  cant  changed

---> console.table help us to print all the entries at one pass
---> js ka engine browser me hota hai 
---> Original is ECMA organisation which maintains the standard
---> But mdn documents is preffered 
---> Data types  - string(prefer "") number boolean  bigInt null(it is a standalone value matlab khali kuch nhi ) undefined -- koi value nhi di symbol(for finding the unique tools) 
---> null ka type object 
---> undefined ka type is undefined
---> symbol is also important data type wile using the components

---> Datatype conversion
--->"33" - 33 , "33abc" - nan . true  - 1 , false - 0
---> number + string = string 
---> string  + number  + number  = string 
---> number  + number = string  = number-string

---> Always compare the same data types - remember that

---> "=" convert null to 0 therefore  null >=0 gives true whereas null > 0  gives false 
---> === checks the datatype also 

/// there are two types of datatypes : primitive - 7 they are call by value  -  string number boolean null undefined symbol  bigint 
- reference type - non primitive - array , objects , functions 

---> arrays : const heroes = ["hello" , "naagraj" , "doga"]
---> object : let myobj = {
    name : "aksh" ,
    age : 22 
}
---> const func = function(){
    console.log(hello) ; 
}  - it's datatype is object function 

---> 2 types of memory 
stack(primitive)- here copy of that is made and than change , heap(non - primitive) - if we change actual value change

---> better to way to concatenate now  a days is like this 
---> consol.log(`fjkahfldf ${} ffjabdfa ${}`) where ${} is a placeholder for variable 

---> when we initialise string like this it makes it object  : const hello = new String("ahdfskfs")
hello[0] , hello.__proto__ , toUpperCase , charAt

---> substring and slice works similarly but slice works with neggative values also 

---> const news = "    dsgkf   "
news.trim() it removes extra space 

---> const url = "sdffskjfbdfs"
url.replace('%20','-')
url.includes('aks')
url.split(' ')

---> we can define the particular type by using new keyword 
---> .toString().length , .toFixed(2) , toPrecision , toCocaleString use('en-IN') , 
---> Number.MAX_VALUE , 


----> Maths library 
abs , round , ceil , floor , min , max , random( 0 and 1 ke beech me aayegi ) do plus 1 ,
 const min  =10 , const max  = 20 
 math.floor(math.random()*10) +1 
 math.random() * (max - min  +1) 

 ---> Dates and Time 
 ---> date is calculate in milliseconds 
let myDate  = new Date() 
 console.log(myDate.toString) ; 
 console.log(myDate.toStr) ;
---> there date is object 
---> we can create our own date
---> date.now() 
---> .getTime() use math.floor / 1000 for in seconds .getDate , .getMonth , .getDay 

---> Arrays
copy make in array meke the shallow copy 
// methods : indexof , shift , unshift , .join  = makes it string , sort , includes , slice , splice

---> splice original array ko manipulate kareta hai jabki slice nhi karta 

---> concat returns new array while push gives the same array

---> new method for this is const all = [...marvel , ... dc]

---> array inside array use flat(infinity)'
---> isArray , from (to make array) , of

-----Objests
//singleton literals se nhi banta constructor se singleton banta hai

const JsUser = {

} or const obj  = Object.create --- this will create singleton set 

const JUser = {
    name : " Aks" ,
    age : 18 , 
    location : "Del"
}

how to access --- console.log(JUser.email) or console.log(JUser["name"]) squarw notation is better 
to use symbol write in square brackets
---> Symbol can be accesed only through []

const user  = new object() --- singleton 
const user  = {} --- non singleton

---> obj.assign({} , obj1 , obj2) -- target , src 

---> mostly use spread operator {...onj1 , ...obj2}
----array ke andar objects 
const users = [
    {},{}
]

---> destructuring 

---> API pehle data aata tha xml me ab aata hai json me jo ki ek object hai --- keys and values both are string 
---> Apis are also in format of array JavaScript Object Notation

----functions 
----Scope 
let a = 10 
const b = 20 
var c = 30 
{} --- this is scope 
variable will be accessible outside the scope which is a problem for us thats why we dont use var now we only use let and const majorly 


---> arrow function
---> in browser the global object is the window object where as when we run it in the ide the global object is empty

const fxn = () =>{

}

// object ko return karna hai to parenthesis me wrap karna hi padegaa uske bina undefined rahega


///IIFE immediately invoked function expressions 

global scope ke ppollution ko hatane ke liye we use this way ()()


---> How does the javascript work behind the scene 
--- Execution context 
    {}--- Global Execution COntext will be formed 
    in ide it is empty but different , in browser it is window  , js is single threaded 
    ---Function execution Context 
    ---Eval Execution context 
    How they are executed ?
    1... Memory Creation phase 
    2... Execution Phase 
    ex : let v1 = 2 
         let v2 = 4 
         function addnum(num1 , num2){
            let t = num1 + num2 
            return t 
         }
         let r1 = addnum(v1 , v2)
         let r2 = addnum(3 , 5)
    i. global exec -- this 
    ii. mem phase -- v1  - undefined , v2 - undefined , addnum - definition , r1 - undef , r2  -undef 
    iii. exec phase -- v1 - 2 , v2 - 4 , addnum -- naya exec context banayenge {new env  + exec thread }--- mem phase v1 - undef , v1 undef , t - undef , ----- exec context -- num1 = 10 , num2  = 5 , t = 15 returned to global exec context and after that the local exec context will be deleted 
    ---- again new var env + thread  - mem phase  ,  exec phase then again return 
--- Call Stack 
i.. global exec 
ii.. one 
then one removed  --- lifo

---central flow in javascript
poora code conditional basis par run hona chahiye 
--- if 
if(condition){

} only enter when true 
comparision 
< , > , <= , >= , == , != , === (this also checks the type ) , !==
--else is conditional  code
-- curly braces ka scope is different
const bal = 1000 
if(bal >500) console.log("test") ; 

---Switch case 
const month   =3  
switch(month){
    case 1:
    console
    break ; 
    case 2 :
    console :
    break ;
    default :
    break  ;
}
all code is breaked once it is matched except default one 


---- truthy value and falsy values 
const userMail = "efew"
if(userEmail){
    console.log()
}else{
    console.log()
}

---falsy values : false , 0 , -0 , BigInt 0n , "" , null , indef , nan
---truthy values : "0" , 'false' , " " , [] , {} , function(){}

Object.keys().length === 0 for checking object empty

false == 0 , false == '' , '' == 0 true all

----Nullish Coalescing Operator (??) : null undefined 
let val1 ; 
val1 = 5 ?? 10
agar 1st value null/undefined hai to 2nd wali assign hojayegi 

----Ternary operaor 
condition ? true : false 

---Loops
-for
-break and continue 
-while 
- do while
- for of loop 
for(const val of arr){
    log val
} 
maps 
const map = new map()
map.set('IN', "India") unique values 
for(const [key , value] of map){
     console.log(key , ':-' , value)
}this will not work for objects 

--- how to loop for in loop 
for(const key in obj){
    console (key)
}
: for in loop work for object but for of not 
: it gives the key like in array keys start from 0 to n 


--- for each loop 

--- filter map reduce 

window 
|
documents
|           |
head         body  --------------------    
title , meta                           |
        |                              div ---- attribute
        attribute                        |
                                        h1 , p 


----> document.getElementById('--id--').innerHTML = "<h1>fsnfsd</h1>"

----> All DOM Selector 
document.querySelector('h1') --- the 1st h1 will be return or we can also slecct using id , class , input[type ="password"]
document.getElementById().getAttribute()

--- const myul  = document.querySelector('ul')
my.querySelector('li')



--- querySelectorAll('li')
give the NodeList of all the tags
const liList = document.querySelectorAll("li")
undefined
li

NodeList(3) [li, li, li]
liList.forEach((item)=>{item.style.color ="green"})
undefined
document.getElementById().setAttribute('class','text')

---> title.style.backgroundColor = 'green'


---> HTMLCOllection we get when wee get elementByClassName
---------To convert use Array.from(tempClassList)
---> .borderradius 

--->title.style.padding = "15px"


title.textContent -- the text which will not be visible will also be shown 
title.innerHTML -- the text which is visible


/// I will select using document.querySelector() and store in a constant 
after that if it would be a Nodelist than it is easier to apply forEach else i Have to create an array using from method after that i can apply , map , filter , reduce , for each for of for in 


--> how to add new element 

---> Edit and remove the DOM element

--- try to use append child instead of using innerHTML as this is a cost heavy operation 



Async Code ---

JS - Synchronoous , Single threaded 

Exec COntext -- exec one line of code at a time --- call stack , memory heap

--- blocking code - block the flow of program - read file Synchronoou

--- non blocking code - does not block execcution - read file async 


--- a language to contact with two syste m

--- earlier we use to have XMLHttpRequest instead of API request 

Value	State	Description
0	UNSENT	Client has been created. open() not called yet.
1	OPENED	open() has been called.
2	HEADERS_RECEIVED	send() has been called, and headers and status  are available.
3	LOADING	Downloading; responseText holds partial data.
4	DONE	The operation is complete.

// C++ IS THE language on which V* engine is made and this is the engine which runs the js on browser 


//Promises 

THE PROMISE OBJECT REPRESENT eventual completion in future 
--pending , fullfill and rejected 
-- we can send the data to resolve function 
-- promise ka pehle then jo return karta hai wo 2nd then me catch karega 


---Does JS has classes , JS is a prototype based programming language behind the scene it is prototype based only  
// Object - collection of props and methods , toLowerCase 
// why use OOP 
// parts of OOP - Object literal , consumer function , prototypes , clases instances (new , this )

// A , E , I , P 

// new is basically a empty object will be created and a constructor function is called then arguements are injected into this 


// magic of prototype 

we made array then in browser it will show prototype : proto is the one which gives access to new , constructor , methods , Haar nhi maana  --- aur kya mil sakta hai mujhe prototype ke andar prototype 

Array ----> Object ----> No parent or null  

String ---> Object ----> null

function ---> is a function but also a object so that is derived and hence prototype of this is null at the end  

if we make Object.prototype.akshat = function(){
    this do something 
}

now this will be present in every object 

 .... TO ADD THE PROPERTIES OF A PARTICULAR TYPE ADD THE PROP OF __PROTO__ : USER ,, NOW THE PROPERTIES OF USER WILL BE PRESENT IN THIS ....


 .... Call 

 Global EC < --- < --- <   this here refer to to the global ec 

 ex : 
 function setUserName(username){
    this.username = username 
 }

 fucntion createUser(username , email , password){
   //  Setusername(username) ;// call hoga but referance holde nhi hoga that why database will not be saved so we will use .call and also pass this as a parameter  
    this.email = email ; 
    this.password = password
 }
 // Static keyword dont allow to access the function 

think of the fields before hand 

try to work using mongoose 

use data modeler or eraser.io
// plural hojayega and in lowercase me shift hojayega when we are using  mongoose 


src ---> index --> app --> constants ---> DB -- Models -- Controllers -- Routes -- Middleware -- Util -- More 

index me db is connected 
app me config and cookie are added 
constants -- enums and db - name 

computer ----> server
         <----  Express ,,,,listen  /:home route 
         /login : login setup 

         get request 


how to get from the frontend :

<!-- function App() {
  const [count, setCount] = useState(0)
  const [jokes , setJokes] = useState([]) 

  useEffect(()=>{
    axios.get("/api/jokes")
    .then((response)=>{
      console.log(response);
      console.log("Hello");
      
      setJokes(response.data)
    })
    .catch((e)=>{
      console.log(e);
    })
  } , []) -->



1.. npm init 

2.. install express 

3.. install env

4.. install mongoose for data modelling 

5.. now you can route the data to particular url 

6.. use mongoose for making data models 

7.. use proxy to avoid cors 

8.. use axios to get the api response 

9.. use nodemon to restart it automatically 

10.. install prettier 

11.. make files like app index constants 

12.. in the src make the folder str of DMCRMU

13.. create .gitignore 

14.. add readme 

15.. for prettier add prettierrc and prettierignore 

16.. cookie parser , cors 

// jab url se data aaye to uski config alag se karni padti hai kyunki kai baar space dall jaata 

// agar json me data aaaye form se to uski bhi limit set karni padti hai we have different options

// middleware 
// req.get --> then method  --  usne url hit kiya  --  me aapko bataonga agar req aagayi to kay karna hai 

--- then me res bhejdunga like res.send("akshat)

--- req to bahut saari aayengi -- sab thodi accept karunga 

-- to beech me cheking lagadi like user logged in hai or may be user admin hai 

-- uske baad me apni compute power use karunga 

---  we have err , req , res , next 
// db me async awaut and try catch hamesh or may be promises  method 

// we will make a asyncHandler as it is used a lot 

// const fn(fxn) = () =>{
    log("Hello")
} : It means ki we are passing a function as a parameter and we expect to return a function in the form arrow function 




// How to connect DB to backend 

use mongoose.connect and then always think of server is in another continent so use async await try and catch block 

// install nodemon for automatic refresh 

// prime focus on req and response 

think of the fields before hand 

try to work using mongoose 

use data modeler or eraser.io
// plural hojayega and in lowercase me shift hojayega when we are using  mongoose 