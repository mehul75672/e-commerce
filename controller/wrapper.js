"use strict"
const wrapper = require("../model/wrapper")
const axios = require('axios');
const datas = require("../model/datas")
const wrapper_add = async (req, res) => {
  try {
    let add = new wrapper({
      wrapper_img: req.file.filename,
      title: req.body.title,
      decs: req.body.decs
    })
    add.save();
    return res.status(201).json({ status: true, result: add });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const wrapper_all = async (req, res) => {
  try {
    var all = await wrapper.find();
    return res.status(200).json({ status: true, result: all });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.messages })
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const data = async (req, res) => {
  try {
    var m = 0
    for (let index = 0; index <= m; index++) {
      const x = new Date(new Date().setDate(new Date().getDate() - index))
      // const y = new Date('2022-11-12');
      if (m <= 365) {
        await sleep(2000);
        m = m + 1
        const date = x.toISOString().slice(0, 10)
        const changeDateFormatTo = date => {
          const [yy, mm, dd] = date.split(/-/g);
          return `${dd}-${mm}-${yy}`;
        };
        const formattedDate = changeDateFormatTo(date);
        await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${formattedDate}`)
        .then(async (response) => {
          var a = await datas.findOne({ date: formattedDate })
          console.log(a);
          if (!a) {
              console.log(formattedDate);
              console.log(response.data.name);
              await datas.create({
                name: response.data.name,
                current_price: response.data.name,
                market_cap: response.data.name,
                total_volume: response.data.name,
                date: formattedDate,
                apiresponse: [{
                  response: response.data
                }]
              })
            } else {
              console.log(formattedDate);
              console.log(response.data.name);
              await a.update({
                name: response.data.name,
                current_price: response.data.name,
                market_cap: response.data.name,
                total_volume: response.data.name,
                date: formattedDate,
                apiresponse: [{
                  response: response.data
                }]
              })
            }
          })
          .catch(function (error) {
            console.log(error);
            return res.status(200).json({ status: false, result: error });

          })
      }
      else {
        return res.status(200).json({ status: true, result: "ok" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const alldata = async (req, res) => {
  try {
    var data = []
    var m = 0
    for (let index = 0; index <= m; index++) {
      const x = new Date(new Date().setDate(new Date().getDate(req.query.name) - index))
      const date = x.toISOString().slice(0, 10)
      const changeDateFormatTo = date => {
        const [yy, mm, dd] = date.split(/-/g);
        return `${dd}-${mm}-${yy}`;
      };
      const formattedDate = changeDateFormatTo(date);
      if (formattedDate >= req.query.a) {
        m++
        console.log(formattedDate);
        const a = await datas.find({
          date: formattedDate
        })
        data.push(a);
      }
      else {
        return res.status(200).json({ status: true, result: data })
      }
    }
    console.log(data);
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
module.exports = { wrapper_add, wrapper_all, data, alldata }
