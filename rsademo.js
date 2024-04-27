// smaller prime number RSA encryption algorithm

// To use this, here are the rules, you can change originalMessage, prime1, prime2, e as follow
// 1. originalMessage is an INT, must be smaller than n, for obvious reason: since you're modulo-ing it, you can't get higher values, so can't encrypt higher values
// 2. prime1 and prime2 must be prime, and maximum 4 digits cause computing power is not enough, im iterating from 1 to phi to find private key
// 3. The e values is defaulted to the smallest value it can be found in liste (an array); any e value would works fine, change e value on line 29
// 4. The reason number appearing 5n beacuse it is BigInt. The value of it is 5. So I concatenate using + instead of ,

const originalMessage = 60
const prime1 = BigInt(1033)
const prime2 = BigInt(3037)

const modulo_n = BigInt(prime1*prime2);
const phi_n = (prime1 - BigInt(1)) * (prime2 - BigInt(1))

console.log("phi: "+ phi_n)

const listPrime = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];

const liste = listPrime.map(item => {
    if (phi_n % BigInt(item) != 0) {
        return item;
    }
}).filter(item => item !== undefined);

console.log("List of e values:", liste.join(", "));

// Assign e value to the first value in the list
const e = BigInt(liste[0])

console.log("Value of e: "+ e)
// Public key
console.log("Value of e, n:(" +e, "," + modulo_n+ ")")


// Private key
// e*d mod_n = 1
let d = BigInt(0);
for (let i = BigInt(1); i< phi_n; i++) {
    if (e*i % phi_n == 1) {
        d = i;
        break;
    }
}

if (d == 0) {
    console.log("The e value is not correct")
}
console.log("Value of d: " +d+ "")

console.log("origin Data: ", originalMessage)

const cipherData = BigInt(originalMessage) ** e % modulo_n

console.log("encrypted data: " + cipherData)

// decrypting
const c = BigInt(cipherData);

// Calculate the result
const result = c ** d % modulo_n;

// Print the result
console.log("decrypted data: "+result);

