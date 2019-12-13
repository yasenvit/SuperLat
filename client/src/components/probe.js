// console.log("HELLO");
// setTimeout(function () {
//     console.log("THIS IS");
// }, 2000);
// console.log("DOG");

// 
// console.log("Hello");
// setTimeout(() => { console.log("World!"); }, 2000);

// let array = [[10, "prompt1"], [20, "prompt2"], [10, "prompt3"]]
// for (let i = 0; i < array.length; i++) {
//     setTimeout(() => { console.log(array[i][1]); }, 2000);
// }
// const theOneFunc = delay => {
//     console.log('Hello after ' + delay + ' seconds');
// };
// setTimeout(theOneFunc, 4 * 1000, 4);
// setTimeout(theOneFunc, 8 * 1000, 8);
// let array = ["a", "b", "c", "d", "e"]
// console.log(array[0])
// for (var i = 1; i < array.length; i++) {
//     (function (index) {
//         setTimeout(function () { console.log(array[index]); }, i * 1000);
//     })(i);
// }


// function setData(index, array, this) {
//     //takes the array, sets the state based on the index, and returns the next duration
//     let dur = Date.parse('1970-01-01T' + array[index]["duration"] + 'Z');
//     console.log("-----dur----", dur)
//     this.setState({
//         duration: dur / 1000, //in seconds
//         prompt: array[index]['prompt'],
//         feedback: array[index]['feedback']
//     });
//     console.log('just set the state');
//     return dur
// };

// function showData(index, array) {
//     //takes the array, sets the state based on the index, and returns the next duration
//     let dur = Date.parse('1970-01-01T' + array[index]["duration"] + 'Z');
//     console.log("-----dur----", dur)
//     let data = {
//         duration: dur / 1000, //in seconds
//         prompt: array[index]['prompt'],
//         feedback: array[index]['feedback']
//     };
//     console.log(data);
//     return data
// };
let array = ["a", "b", "c", "d", "e"]

console.log(array[0])

for (var i = 1; i < array.length; i++) {

    (function (index) {
        setTimeout(function () { console.log(array[index]); }, i * 3000);
    })(i);
}
