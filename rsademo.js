// smaller prime number RSA encryption algorithm

// To use this, here are the rules, you can change originalMessage, prime1, prime2, e as follow
// 1. originalMessage is an INT, must be smaller than n, for obvious reason: since you're modulo-ing it, you can't get higher values, so can't encrypt higher values
// 2. prime1 and prime2 must be prime, and maximum 4 digits cause computing power is not enough, im iterating from 1 to phi to find private key
// 3. The e values is defaulted to the smallest value it can be found in liste (an array); any e value would works fine
// 4. The reason number appearing 5n beacuse it is BigInt. The value of it is 5. So I concatenate using + instead of ,

// Uncomment this to assign fixed value for e, the value must be in list of e values
const e_value = 17

const originalMessage = 55
const prime1 = BigInt(31)
const prime2 = BigInt(47)

const n = BigInt(prime1*prime2);
const phi_n = (prime1 - BigInt(1)) * (prime2 - BigInt(1))

function decomposeToPowersOf2(n) {
    let result = [];
    let power = BigInt(1);
    n = BigInt(n);

    while (n > 0n) {
        if (n % 2n === 1n) {
            result.push(power);
        }
        n = n / 2n;
        power *= 2n;
    }

    return result;
}

console.log("N: "+ n)
console.log("phi: "+ phi_n)

const listPrime = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];

const liste = listPrime.map(item => {
    if (phi_n % BigInt(item) != 0 && BigInt(item) < phi_n ) {
        return item;
    }
}).filter(item => item !== undefined);

console.log("List of e values:", liste.join(", "));

// Default to first value
const e = (typeof e_value !== 'undefined' ? BigInt(e_value) : BigInt(liste[0]));

const e_decomposed = decomposeToPowersOf2(e)
console.log("Value of e: "+ e + " =" , e_decomposed.map(power => power.toString()).join(" + "))

// Public key
console.log("Value of e, n:(" +e, "," + n+ ")")


// Private key
// e*d mod_n = 1
let d = BigInt(0);
for (let i = BigInt(1); i< n; i++) {
    if (e*i % phi_n == 1 && i != e) {
        d = i;
        break;
    }
}

if (d == 0) {
    console.log("The e value is not correct, must get from list of e values")
}
const d_decomposed = decomposeToPowersOf2(d)
console.log("Value of d: " +d + " =" ,  d_decomposed.map(power => power.toString()).join(" + "))



console.log("origin Data: ", originalMessage)

const cipherData = BigInt(originalMessage) ** e % n

console.log("encrypted data: " + cipherData)

// decrypting
const c = BigInt(cipherData);

// Calculate the result
const result = c ** d % n;

// Print the result
console.log("decrypted data: "+result);

process.stdout.write("Value of ((m ^ exponent) modulo n): ")
e_decomposed.forEach((exponent) => {
    process.stdout.write(exponent + " : " + (BigInt(originalMessage) ** exponent) % n + ", ")
})
console.log()

process.stdout.write("Value of ((C ^ exponent) modulo n): ")
d_decomposed.forEach((exponent) => {
    process.stdout.write(exponent + " : " + (BigInt(cipherData) ** exponent) % n + ", ")
})
console.log()