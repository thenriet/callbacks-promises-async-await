const fs = require('fs');
const superagent = require('superagent');

/////////////////////////////
// CALLBACKS
/////////////////////////////

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random/`)
//     .end((err, res) => {
//       if (err) console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) console.log(err.message);
//         console.log('image saved to file');
//       });
//     });
// });

////////////////////////////////
// PROMISES
////////////////////////////////

// Have to build promises first
// const readFilePro = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//       if (err) reject('I could not find that file');
//       resolve(data); // resolve is what is returned if everything is successful
//     });
//   });
// };

// const writeFilePro = (file, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, (err) => {
//       if (err) reject('I could not write that file');
//       resolve('success');
//     });
//   });
// };

// readFilePro(`${__dirname}/dog.txt`) // return a promise, so we can .then on it
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random/`); // return a promise, so we can .then on it
//   })
//   // .then will handle the successful case
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//   }) // return a promise, so we can .then on it
//   .then(() => {
//     console.log('image saved to file');
//   })
//   // .catch will handle the error coming from either one of the three promises
//   .catch((err) => {
//     console.log(err.message);
//   });

//////////////////////////
// ASYNC AWAIT
//////////////////////////

// We need to build promises first
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data); // resolve is what is returned if everything is successful
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('I could not write that file');
      resolve('success');
    });
  });
};

const getDocPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`); // await stop the execution of the code until the promise is resolved
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random/`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('image saved to file');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

getDocPic();
