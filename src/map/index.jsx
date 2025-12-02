
export function MapFunctions(){


   const numbers = [20,2,1,3, 6];
   //Pass the numerical comparator function (a, b) => a - b
   const sortedNumbers = numbers.sort((a, b) => a - b);

   //.
   console.log(sortedNumbers);

   const evenNumbers = numbers.filter(isEven);

   console.log(evenNumbers);



    const products = [
        { name: "Basic Tee", price: 20, isPremium: false },
        { name: "Leather Wallet", price: 80, isPremium: true },
        { name: "Cotton Socks", price: 15, isPremium: false },
        { name: "Gold Watch", price: 500, isPremium: true }
    ];


    const firstPremium = products.find(isPremiumProduct);

    console.log("First premium", firstPremium);

    function isPremiumProduct(product){
        // 2. The function returns true if the current product is premium.
        // As soon as this returns true, .find() STOPS iterating and returns that product object.
        return product.isPremium === true;
    }


    const differentProducts = [
        { name: "Basic Tee", price: 20 },
        { name: "Leather Wallet", price: 80 },
        { name: "Gold Watch", price: 500 },
        { name: "Cotton Socks", price: 15 }
    ];

    // 1. .reduce() takes a callback (accumulator, current) and an initial value (0).
    const totalPrice = differentProducts.reduce(sumPrices, 0);


    console.log(`The total price is: $${totalPrice}`);

    function sumPrices(accumulator, currentProduct){
        // 2. Add the current product's price to the running total (accumulator).
        const newTotal = accumulator + currentProduct.price;

        // 3. RETURN the new running total. This becomes the accumulator for the next iteration.
        return newTotal;
    }


   function isEven(element){
       const isEvenResult = element % 2 === 0;

       return isEvenResult
   }
}

