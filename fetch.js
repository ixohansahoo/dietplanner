fetch("food.json").then(Response => Response.json()).then(data => logJSONData(data));
var api_len = 0;
const bf_food = [];
const bf_calories = [];
const ln_food = [];
const ln_calories = [];
const dn_food = [];
const dn_calories = [];
function logJSONData(data) {
    // console.table(data.Sheet1[0].carb);
    const a = data.Sheet1[0].breakfast;
    console.log(data.Sheet1.length)
    console.log("iiiiiiiiiiiiii")
    api_len = data.Sheet1.length;

    //console.log(data.Sheet1.length-1)
    let bfcount = 0;
    let lncount = 0;
    let dncount = 0;
    for (let i = 0; i < data.Sheet1.length; i++) {
        const a = data.Sheet1[i].breakfast;
        const a1 = data.Sheet1[i].lunch;
        const a2 = data.Sheet1[i].dinner;
        const b = data.Sheet1[i].calorie;
        const b1 = b.substring(0, b.length - 4)
        const c = data.Sheet1[i].food;
        if (a === true) {
            bf_food[bfcount] = c;
            bf_calories[bfcount] = b1;
            bfcount += 1;
        }
        if (a1 === true) {
            ln_food[lncount] = c;
            ln_calories[lncount] = b1;
            lncount += 1;
        }
        if (a2 === true) {
            dn_food[dncount] = c;
            dn_calories[dncount] = b1;
            dncount += 1;
        }

    }

}
function mainf(data) {
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var bmr = calculateBMR(weight, height, age, gender);
    console.log(bmr);

    var req_b_cal = bmr * (0.3);
    var req_l_cal = bmr * (0.4);
    var req_d_cal = bmr * (0.3);
    var bffoodandcal=requiredfood(bf_food, bf_calories, req_b_cal);
    var lnfoodandcal=requiredfood(ln_food, ln_calories, req_l_cal);
    var dnfoodandcal=requiredfood(dn_food, dn_calories, req_d_cal);
    var bf_food_select=Array.from( bffoodandcal.keys() );
    var bf_cal_select=Array.from( bffoodandcal.values() );
    var ln_food_select=Array.from( lnfoodandcal.keys() );
    var ln_cal_select=Array.from( lnfoodandcal.values() );
    var dn_food_select=Array.from( dnfoodandcal.keys() );
    var dn_cal_select=Array.from( dnfoodandcal.values() );
    displayfood(bf_food_select,bf_cal_select,"bf_id","Breakfast :");
    displayfood(ln_food_select,ln_cal_select,"ln_id","Lunch :");
    displayfood(dn_food_select,dn_cal_select,"dn_id","Dinner :");
}
function requiredfood(foodname, cal, reqcal) {
    let min = 0;
    let max = foodname.length - 1;
    let twofood = [];

    while (twofood.length != 2) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (twofood.includes(randomNumber)) {
            console.log(1)
        }
        else {
            twofood.push(randomNumber)
        }
    }

    const reqcalories1 = reqcal / 2;
    const x = twofood[0]
    const y = twofood[1]

    const a = cal[x]
    const b = cal[y]

    const c = a / 100;
    var necess = Math.floor(reqcalories1 / c);
    const d = b / 100;
    var necess2 = Math.floor(reqcalories1 / d);
    console.log(necess + " " + necess2);
    // alert("you need "+foodname[x]+" in "+necess+" gm")
    // alert("you need "+foodname[y]+" in "+necess2+" gm")
    var foodandcal = new Map();
    foodandcal.set(foodname[x], necess);
    foodandcal.set(foodname[y], necess2);
    return foodandcal;
}

function displayfood(f, c,fid,wh) {
    var h = document.getElementById(fid);
    var f1=f[0];
    var f2=f[1];
    var c1=c[0];
    var c2=c[1];
    var x = wh+" you need " + c1 + " gm of " + f1+" and "+c2+" gm of "+f2;
    console.log(x)
    document.getElementById(fid).innerHTML = x;
    document.getElementById("planbtn").value = "Re-generate";
    
}
function calculateBMR(weight, height, age, gender) {
    // var weight = parseFloat(document.getElementById("weight").value);
    // var height = parseFloat(document.getElementById("height").value);
    // var name = document.getElementById("name").value;
    // var age = document.getElementById("age").value;
    // var gender = document.getElementById("gender").value;

    var bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height * 100) - (5 * age) + 5;
    } else if (gender === 'female') {
        bmr = (10 * weight) + (6.25 * height * 100) - (5 * age) - 161;
    }
    //var bmi = weight / (height * height);
    return bmr;
    // document.getElementById("result").innerText = "Hello " + name + "\n Your BMR is: " + bmr.toFixed(2) + " bmi is" + bmi.toFixed(2);
}
// async function logJSONData() {
//     const response = await fetch("food.json");
//     const jsonData = await response.json();
//     console.log(jsonData.sheet1);
//   }