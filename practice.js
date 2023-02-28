// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

// If you would like to take a look at the inputs that are passed into these functions, please
// feel free to check out the data.js file.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function (fruits) {
  var results = [];

  _.each(fruits, function(fruit, index, collection) {
    results.push(fruit);
  });

  return results;
};

// use _.each to traverse the number array and determine
// which are multiples of five.
var multiplesOfFive = function (numbers) {
  var fives = 0;
  _.each(numbers, function(fruit, index, collection) {
    if (fruit % 5 === 0) {
      fives++;
    }
  });
  return fives;
};

// use _.each to build an array containing only tweets belonging to a specified user.
var getUserTweets = function(tweets, user) {
  var userTweets = [];
  _.each(tweets, function(tweet, index, tweets) {
    if (tweet.user === user) {
      userTweets.push(tweet);
    }
  });
  return userTweets;
};

/*
 *
 *  _.filter
 *
 */

// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function (fruits, targetFruit) {
  return _.filter(fruits, function(fruit, index, fruits) {
    return targetFruit === fruit;
  });
};

// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function (fruits, letter) {
  return _.filter(fruits, function(fruit, index, fruits) {
    return fruit[0] === letter;
  });
};

// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function (desserts) {
  return _.filter(desserts, function(dessert, index, desserts) {
    return dessert.type === 'cookie';
  });
};

// rebuild the getUserTweets function from above with _.filter instead
var filterUserTweets = function(tweets, user) {
  return _.filter(tweets, function(tweet, index, tweets) {
    return tweet.user === user;
  });
};

/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function (fruits) {
  return _.map(fruits, function(fruit, index, fruits) {
    return fruit.toUpperCase();
  });
};

// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.
var glutenFree = function (desserts) {
  return _.map(desserts, function(dessert, index, desserts) {
    var ingredients = dessert.ingredients;
    dessert.glutenFree = ingredients.indexOf('flour') === -1;
    return dessert;
  });
};

// given an array of tweet objects, return a new array of strings
// containing only the message properties.
var allUserMessages = function(tweets) {
  return _.map(tweets, function(tweet, index, tweets) {
    var message = tweet.message;
    return message;
  });
};

// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68'
    }
  ];

*/
var applyCoupon = function (groceries, coupon) {
  var applyCoupon = function (item) {
    var itemPrice = item.price;
    var itemPriceDigits = itemPrice.slice(1, itemPrice.length);
    var itemPriceNum = (Number(itemPriceDigits)) * 100;
    var couponNum = coupon * 100;
    var saleAmount = itemPriceNum * coupon;
    var salePrice = Math.round(itemPriceNum - saleAmount) / 100;
    item.salePrice = '$' + salePrice;
    return item;
  };
  return _.map(groceries, applyCoupon);
};

/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function (products) {
  var getSum = function (accumulator, item) {
    var itemPrice = item.price;
    var itemPriceDigits = itemPrice.slice(1, itemPrice.length);
    var itemPriceNum = (Number(itemPriceDigits));
    accumulator = accumulator + itemPriceNum;
    return accumulator;
  };
  return _.reduce(products, getSum, 0);

};

// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }
var dessertCategories = function (desserts) {
  var getDessertTypes = function (accumulator, dessert) {
    var dessertType = dessert.type;
    if (accumulator[dessertType] === undefined) {
      accumulator[dessertType] = 1;
    } else {
      accumulator[dessertType] += 1;
    }
    return accumulator;
  };
  return _.reduce(desserts, getDessertTypes, {});
};

// return an object with the proper count of all user messages
/*
 example output:
  var tweetCountPerUser = countMessagesPerUser(tweets);
  {
    "douglascalhoun": 5,
    "mracus": 6,
    "shawndrost": 5,
    "sharksforcheap": 3
  }
*/
var countMessagesPerUser = function(tweets) {
  var getTweetCount = function (accumulator, tweet) {
    var currentUser = tweet.user;
    if (accumulator[currentUser] === undefined) {
      accumulator[currentUser] = 1;
    } else {
      accumulator[currentUser] += 1;
    }
    return accumulator;
  };
  return _.reduce(tweets, getTweetCount, {});
};

// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function (movies) {
  return _.reduce(movies, function(accumulator, movie) {
    if (movie.releaseYear >= 1990 && movie.releaseYear <= 2000) {
      accumulator.push(movie.title);
    }
    return accumulator;
  }, []);
};

// return an boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function (movies, timeLimit) {
  return _.reduce(movies, function(accumulator, movie) {
    if (movie.runtime < timeLimit) {
      accumulator = true;
    }
    return accumulator;
  }, false);
};
