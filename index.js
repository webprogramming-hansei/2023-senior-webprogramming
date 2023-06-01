const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");

const accounts = [];
/*
{ id: '', password: '' }
*/

/**
 * 회원가입 API
 * @params
 * id, password
 */
app.post("/register", (req, res) => {
  const { id, password } = req.body;

  /**
   * id 규칙에 맞는지 ex) 이메일 형식에 맞는지? 중복된 id가 존재 하는지 체크
   * password 조건에 ex) 특수문자, 숫자, 영어 모두 포함되었는지?
   */

  bcrypt.hash(password, 10, function (err, hash) {
    console.log(hash);
    accounts.push(id, hash);
    res.json({ message: "success" });
  });
});

const raws = [];
let balance = 0;

app.post("/raws", (req, res) => {
  const { type, value } = req.body;

  if (type === "1") {
    balance += Number(value);
  } else if (type === "2") {
    balance -= Number(value);
  }

  raws.push({
    type: Number(type),
    value: Number(value),
    balance,
  });
  console.log(req.body);

  res.json({ message: "success" });
});

app.get("/raws", (req, res) => {
  res.json(raws);
});

app.get("/sample", (req, res) => {
  res.json([
    {
      type: "용돈",
      value: 15000,
      balance: 15000,
    },
    {
      type: "지출",
      value: -5000,
      balance: 10000,
    },
    {
      type: "지출",
      value: -5000,
      balance: 5000,
    },
    {
      type: "지출",
      value: -5000,
      balance: 0,
    },
    {
      type: "용돈",
      value: 20000,
      balance: 20000,
    },
  ]);
});

app.get("/lecture/:no", (req, res) => {
  // no 파라미터를 통해 DB에 질의를 해서 데이터를 가져와서 ...

  // const lectureNo = req.params.no;
  const { no } = req.params;
  const numArray = [1, 3, 5, 7, 9];

  // lectureNo 숫자인지?

  if (isNaN(Number.parseInt(no))) {
    return res.render("error");
  }
  const { summary } = req.query;
  const date = req.query.date;

  res.render("index", {
    lectureNo: no,
    summary,
    date: date,
    numArray,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
