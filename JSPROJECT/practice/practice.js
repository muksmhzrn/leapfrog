// var obj ={
//     name: 'mukesh',
//     age:'23',
//     email:'khe@gmail.com'
// }
// console.log(obj.value);
// console.log(obj['key']);
// console.log(obj.key);


// var a = [1, 2, 3, 4];

// for (var i = 0; i < a.length; i++) {
//     console.log(i, a[i]);
//     if (a[i]===3){
        
//          console.log('done');
//          break;
//     }
// };


var obj = {
    id: 1,
    name: 'John Doe'
};

var keys = Object.keys(obj);

for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = obj[key];

    console.log(key, value);
}