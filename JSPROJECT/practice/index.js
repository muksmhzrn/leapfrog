// var languages = ['php','python','c','c++','java',              
// 'php','python','c','c++','java','ruby',
// 'php','python','go','c','c++','java','aws'
// ];

//task 1 : prepare one unique array from given array
//task 2 : calculate the number of occurance 


//task 1:
// var newarray = languages.filter(function(value,index,arr){
//     return arr.indexOf(value) === index;
// })
// console.log(newarray);



// //task2:
// var calculate = languages.reduce(function(acc,value,index,arr){
//     acc[value] = (acc[value] || 0) + 1;
//     return acc;
// },{});
// console.log(calculate);






// var array =[1,2,3,4,5];

// var result= array.forEach(function(value,index,self){
//     console.log(value,index);
//     self[index]=value +1;
//     // return value + 1;
// })
// console.log('For Each',result,array)


//maap
// var array =[1,2,3,4,5];
// var result = array.map(function(value,index){
//     console.log(index,value);
//     return value+1;
// })
// console.log('Map' ,result,array);

// //iterating over
// var array =[1,2,3,4,5];
// var result = array.filter(function(value,index){
//     return value%2==0; //return true or false
// });
// console.log(result);

//reduce

// var array =[1,1,1,1,1];
// var sum = array.reduce(function(acc,curr){
//     acc +=curr;
//     return acc;
// },0)
// console.log('sum', sum);


//hard stuff

//setinterval
// var counter = 0;

// setInterval(function(){
//     counter++;
//     console.log(counter)
// },1000);


//settimer
// var counter = 0;

// var gameinterval=setInterval(function(){
//     counter++;
//     console.log(counter)
// },1000);

// setTimeout(function(){
//     clearInterval(gameinterval);
// },5000);


// (function(){
//     console.log('hello');
// })();

// for(var i=0; i< 10 ; i++){
//     setTimeout((function(i){
//         console.log(i);
//     })(i),1000);
// }


//closure

// function integerNumber(x) {
//     function add(y) {
//         return x + y;
//     }
//     function mul(y) {
//         return x * y;
//     }
//     return {
//         add: add,
//         mul: mul
//     }

// }
// var fiveintegerNumber = integerNumber(5);
// var result1 = fiveintegerNumber.add(2);
// var result2 = fiveintegerNumber.mul(3);
// console.log(result1,result2);


// *****
// ****
// ***
// **
// * 

// function task1(){
//     for(var i=0; i<5;i++){
//         var star = '';
//     for(var j=5; j>i;j--){
//          star +='*';
//     }
//         console.log(star);
//     }
// }
// task1();


// function task1(getpattern){
//         for(var i=0; i<getpattern;i++){
//             var star = '';
//         for(var j=getpattern; j>i;j--){
//              star +='*';
//         }
//         star +='\n';
//         }
//         return star;
//     }
// console.log(task1(5));



// tak2
// Define an object containing information about yourself. The object needs to include 'name', 'address', 'emails', 'interests' and 'education'. The 'education' key needs to be an array of objects containing keys 'name' and 'enrolledDate'.
// Using the object defined previously iterate over the 'education' key and print a list of output in the console as follows:
// Name: ABC School of Schoolery, Date: 2000
// Name: BCD School of Trickery, Date: 2006


// function task2(){
//     var muks={
//         name :'mukesh maharjan',
//         address: 'harisiddhi',
//         email: 'khecha.apex@gmail.com',
//         intrested: 'football',
//         education: [
//             {
//                 name: 'nalanda higher secondary school',
//                 enrolled_date: '2065'
//             },
//             {
//                 name:'Molihss',
//                 enrolled_date: '2070'
//             },
//             {
//                 name: 'Academia international college',
//                 enrolled_date: '2072'  
//         }
//         ]

//     }
//     console.log(muks);
//     muks.education.forEach(function(value){
//         console.log('Name :'+ value.name ,'Enrolled_Date :' + value.enrolled_date);
//     })

// }
// task2();



// task3
// Write a function that searches for an object by a specific key value in an array of objects:
// var fruits = [
//     {id: 1, name: 'Banana', color: 'Yellow'},
//     {id: 2, name: 'Apple', color: 'Red'}
// ]

// searchByName(fruits, 'apple');
// Should return: {id: 2, name: 'Apple', color: 'Red'}

// Also try searchByKey(fruits, 'name', 'apple');


// function task3(){
//     var fruits = [
//         {id: 1, name: 'Banana', color: 'Yellow'},
//         {id: 2, name: 'Apple', color: 'Red'}
//     ]
//     function searchByName(arr,str){
//         var check = arr.filter(function(value){
//             var lower = value.name.toLowerCase();
//             return lower === str;
//         })
//         console.log(check);
//     }
//    searchByName(fruits,'banana');
// }
// task3();

//    function searchByKey(arr,key, val){
//     var check = arr.filter(function(value){
//         return value[key] === val;
//     })
//     console.log(check);
// }
// searchByKey(fruits,'id', 2);
// }
// task3();




// task4
// Write a function that transforms an array of inputs into a new array based on a provided transformation function.
// var numbers = [1, 2, 3, 4];

// function transform(collection, tranFunc) { …TODO }

// var output = transform(numbers, function(num) {
//     return num * 2;
// });
// // output should be [2, 4, 6, 8]


// function task4() {
//     var number = [1, 2, 3, 4, 5]
//     // var newarray = number.map(function(value){
//     //     return value*2;
//     // })

//     var newarray = [];
//     number.forEach(function (val) {
//         newarray.push(val * 2);
//     })

//     console.log(newarray);
// }
// task4();



// task5
// Write a program to sort an array of object by a target key. The original array should remain unchanged.
// var arr = [{
//     id: 1,
//     name: 'John',
// }, {
//     id: 2,
//     name: 'Mary',
// }, {
//     id: 3,
//     name: 'Andrew',
// }];

// function sortBy(array, key) {
//     ...
// }

// var sorted = sortBy(arr, 'name');

// var arr = [{
//         id: 1,
//         name: 'John',
//     }, {
//         id: 2,
//         name: 'Mary',
//     }, {
//         id: 3,
//         name: 'Andrew',
//     }];

// function solution5() {
//     var arr = [{
//         id: 1,
//         name: 'John',
//     }, {
//         id: 2,
//         name: 'Mary',
//     }, {
//         id: 3,
//         name: 'Andrew',
//     }];

//     function sortBy(array, key) {
//         return array.slice(0).sort(function (a, b) {
//             if (a[key] < b[key]) {
//                 return -1;
//             }
//             if (a[key] > b[key]) {
//                 console.log(1)
//                 return 1;
//             }
//             return 0;
//         });
//     }
//     var sorted = sortBy(arr, 'name');
//     console.log("Sorted Array", sorted);
//     console.log("Old Array", arr)
// }
// solution5();



// Normalization

var input = {
    '1': {
        id: 1,
        name: 'John',
        children: [
            { id: 2, name: 'Sally' },
            { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
        ]
    },
    '5': {
        id: 5,
        name: 'Mike',
        children: [{ id: 6, name: 'Peter' }]
    },
    '7': {
        id: 7,
        name: 'Samantha',
        children: [
            { id: 8, name: 'Kylie' },
            { id: 9, name: 'Walter' }
        ]
    }
};

var result = {};
var index = 0;
//   var childList = [];

function normalization(obj) {
    Object.keys(obj).forEach(function (el) {
        normalizeObj(input[el]);
    });
}

function normalizeObj({ id, name, children = null }) {
    console.log(id, name);
    ++index;
    var childList = [];
    if (children) {
        children.forEach(function (el) {
            childList.push(el.id);
        })
        result[index] = { id: index, name: name, children: childList };
        children.forEach(function (el) {
            normalizeObj(el);
        })

    }
    else {
        result[index] = { id: index, name: name };
    }

}

normalization(input);
console.log(result);


