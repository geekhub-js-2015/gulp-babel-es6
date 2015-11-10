import message from './x';
import $ from 'jquery';

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('button').addEventListener('click', (e) => {
        console.log(message);

        let arr = [1, 2, 3];
        arr.map(x => x + 1);

        reverse(arr);
        console.log(arr);

        let [a, b, c] = arr;

        let d = {x: 1, y:2};

        let {x, y, z = 1} = d;

        console.log(a, b, c);

        let obj = {
            a,
            b,
            c,
            fn() {
                return 1;
            }
        };

        console.log(obj.a, obj.b, obj.c);

        const PI = 3.14;

        console.log(add(1));

        console.log(sum(1, 2, 3));

        console.log(sum(1, ...arr));

        console.log(`a is ${a}, b is ${b}, c is ${c}, together ${sum(a, b, c)}`);

        for (let value of [1, 2, 3]) {
            console.log(value);
        }
    });
});

function reverse(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
        let tmp = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = tmp;
    }
    return arr;
}

function add(a, b = 1) {
    return a + b;
}

function sum(...a) {
    return a.reduce(add, 0);
}
