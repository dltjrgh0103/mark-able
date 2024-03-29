import React, { useState, Component } from "react";
import axios from "axios";

import styles from "./style.module.css";

import Title from "./components/Title";
import MostSimilarityTxt from "./components/MostSimilarityTxt";
import Loading from "./components/Loading";
import Banner from "./components/Banner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [mode, setMode] = useState("welcome");
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState("undifined");
  const [list, setList] = useState("none");
  const [loading, setLoading] = useState("true");

  const [score, setScore] = useState("");
  const [url, setUrl] = useState("");
  const [list1, setList1] = useState("none");
  const [list2, setList2] = useState("none");
  const [list3, setList3] = useState("none");
  const [list4, setList4] = useState("none");
  const [list5, setList5] = useState("none");

  const [keyword, setKeyword] = useState("");
  // const [keyword_code, setKeywordCode] = useState("");

  const [category1, setCategory1] = useState("");
  const [name1, setName1] = useState("");
  const [similar_code1, setSimilarCode1] = useState("");
  const [category2, setCategory2] = useState("");
  const [name2, setName2] = useState("");
  const [similar_code2, setSimilarCode2] = useState("");
  const [category3, setCategory3] = useState("");
  const [name3, setName3] = useState("");
  const [similar_code3, setSimilarCode3] = useState("");
  const [category4, setCategory4] = useState("");
  const [name4, setName4] = useState("");
  const [similar_code4, setSimilarCode4] = useState("");
  const [category5, setCategory5] = useState("");
  const [name5, setName5] = useState("");
  const [similar_code5, setSimilarCode5] = useState("");
  const [category6, setCategory6] = useState("");
  const [name6, setName6] = useState("");
  const [similar_code6, setSimilarCode6] = useState("");
  const [category7, setCategory7] = useState("");
  const [name7, setName7] = useState("");
  const [similar_code7, setSimilarCode7] = useState("");
  const [category8, setCategory8] = useState("");
  const [name8, setName8] = useState("");
  const [similar_code8, setSimilarCode8] = useState("");
  const [category9, setCategory9] = useState("");
  const [name9, setName9] = useState("");
  const [similar_code9, setSimilarCode9] = useState("");
  const [category10, setCategory10] = useState("");
  const [name10, setName10] = useState("");
  const [similar_code10, setSimilarCode10] = useState("");
  const [many1, setMany1] = useState("");
  const [many2, setMany2] = useState("");

  var _list = null;

  const processText = e => {
    setText(e.target.value);
  };

  const processKeyword = e => {
    setKeyword(e.target.value);
  };

  const onKeyPress1 = e => {
    if (e.key === "Enter") {
      sendData();
    }
  };

  const onKeyPress2 = e => {
    if (e.key === "Enter") {
      getList();
    }
  };

  // const codeText = () => {
  //   getCode1();
  //   getCode2();
  //   getCode3();
  //   getCode4();
  //   getCode5();
  //   getCode6();
  //   getCode7();
  //   getCode8();
  //   getCode9();
  //   getCode10();
  // };

  const sendData = () => {
    if (code === "") {
      alert("유사군코드가 선택되지 않았습니다.");
    } else if (text === "") {
      alert("상표명을 입력해주세요.");
    } else {
      setMode("result");
      let form = new FormData();
      form.append("title", text);
      form.append("code", code);

      axios
        .post(`http://127.0.0.1:5000/trademark/api/data_transmit`, form)
        .then(response => {
          console.log("response : ", JSON.stringify(response, null, 2));

          console.log(response["data"]["results"]);
          var data_split = JSON.stringify(response["data"]["results"]);
          console.log(data_split);

          setScore("");
          setUrl("");
          setList1("none");
          setList2("none");
          setList3("none");
          setList4("none");
          setList5("none");

          setLoading(false);

          var score_split = data_split.split("score");
          var url_split = data_split.split("url");
          var enrollNum_split = data_split.split("enroll_num");
          setUrl(url_split);
          if (score_split[1].split(",")[0].split("[")[1].split("]")[0] === "") {
            setScore("100%");
            setUrl("");
          } else {
            setScore(
              100 -
                (
                  score_split[1].split(",")[0].split("[")[1].split("]")[0] * 100
                ).toFixed(2) +
                "%"
            );
            if (url_split[1].charAt(2) === '"') {
              setUrl(url_split[1].split('"')[2]);
            } else {
              setUrl(url_split[1].split("'")[2]);
            }
          }

          var list_split = data_split.split("title");

          if (
            (score_split[1].split(",")[0].split("[")[1] * 100).toFixed(2) ===
            "NaN"
          ) {
            setList1(
              list_split[1].split(",")[0].split(":")[1].split("}")[0] +
                "\n출원번호 :  " +
                enrollNum_split[1].split(",")[0].split(":")[1] +
                "\n유사도 : " +
                (
                  score_split[1].split(",")[0].split("[")[1].split("]")[0] * 100
                ).toFixed(2) +
                "%"
            );
          } else {
            setList1(
              list_split[1].split(",")[0].split(":")[1].split("}")[0] +
                "\n출원번호 :  " +
                enrollNum_split[1].split(",")[0].split(":")[1] +
                "\n유사도 : " +
                (score_split[1].split(",")[0].split("[")[1] * 100).toFixed(2) +
                "%"
            );
          }
          if ((score_split[1].split(",")[1] * 100).toFixed(2) === "NaN") {
            setList2(
              list_split[2].split(",")[0].split(":")[1].split("}")[0] +
                "\n출원번호 :  " +
                enrollNum_split[2].split(",")[0].split(":")[1] +
                "\n유사도 :  " +
                (score_split[1].split(",")[1].split("]")[0] * 100).toFixed(2) +
                "%"
            );
          } else {
            setList2(
              list_split[2].split(",")[0].split(":")[1].split("}")[0] +
                "\n출원번호 :  " +
                enrollNum_split[2].split(",")[0].split(":")[1] +
                "\n유사도 :  " +
                (score_split[1].split(",")[1] * 100).toFixed(2) +
                "%"
            );
          }

          if ((score_split[1].split(",")[2] * 100).toFixed(2) === "NaN") {
            setList3(
              list_split[3].split(",")[0].split(":")[1].split("}")[0] +
                "\n출원번호 :  " +
                enrollNum_split[3].split(",")[0].split(":")[1] +
                "\n유사도 : " +
                (score_split[1].split(",")[2].split("]")[0] * 100).toFixed(2) +
                "%"
            );
          } else {
            setList3(
              list_split[3].split(",")[0].split(":")[1].split("}")[0] +
                "\n출원번호 :  " +
                enrollNum_split[3].split(",")[0].split(":")[1] +
                "\n유사도 : " +
                (score_split[1].split(",")[2] * 100).toFixed(2) +
                "%"
            );
          }
          if ((score_split[1].split(",")[3] * 100).toFixed(2) === "NaN") {
            setList4(
              list_split[4].split(",")[0].split(":")[1].split("}")[0] +
                "\n출원번호 :  " +
                enrollNum_split[4].split(",")[0].split(":")[1] +
                "\n유사도 : " +
                (score_split[1].split(",")[3].split("]")[0] * 100).toFixed(2) +
                "%"
            );
          } else {
            setList4(
              list_split[4].split(",")[0].split(":")[1].split("}")[0] +
                "\n출원번호 :  " +
                enrollNum_split[4].split(",")[0].split(":")[1] +
                "\n유사도 : " +
                (score_split[1].split(",")[3] * 100).toFixed(2) +
                "%"
            );
          }
          setList5(
            list_split[5].split(",")[0].split(":")[1].split("}")[0] +
              "\n출원번호 :  " +
              enrollNum_split[5].split(",")[0].split(":")[1] +
              "\n유사도 : " +
              (score_split[1].split(",")[4].split("]")[0] * 100).toFixed(2) +
              "%"
          );
        })
        .catch(error => {
          console.log("failed", error);
        });
    }
  };

  const toWelcomeChange = () => {
    setMode("welcome");
    setState("undefined");
    setText("");
    setCode("");
    setMany1("");
    setMany2("");
    setList("none");
    setLoading("true");
  };

  class ResultZone extends Component {
    render() {
      return (
        <div className={styles.result_zone}>
          <ReportZone1></ReportZone1>
          <ReportZone2></ReportZone2>
        </div>
      );
    }
  }

  class ReportZone1 extends Component {
    render() {
      return (
        <div className={styles.report_zone1}>
          <MostSimilarity></MostSimilarity>
        </div>
      );
    }
  }

  class MostSimilarity extends Component {
    render() {
      return (
        <div className={styles.most_similarity}>
          <MostSimilarityTxt></MostSimilarityTxt>
          <MostSimilarityNum></MostSimilarityNum>
        </div>
      );
    }
  }

  class MostSimilarityNum extends Component {
    render() {
      return <div className={styles.most_similarity_num}>{score}</div>;
    }
  }

  class ReportZone2 extends Component {
    render() {
      return (
        <div className={styles.report_zone2}>
          <SimilarList></SimilarList>
        </div>
      );
    }
  }

  class ListTitle extends Component {
    render() {
      return (
        <div className={styles.list_title}>
          📝 &nbsp;"{text}" 와 유사한 상표 리스트
        </div>
      );
    }
  }

  class SimilarList extends Component {
    render() {
      return (
        <div className={styles.similar_list}>
          <ListTitle></ListTitle>
          <Ul></Ul>

          <img className={styles.result_url} src={url} alt=""></img>
        </div>
      );
    }
  }

  class Ul extends Component {
    render() {
      return (
        <ul>
          <li>
            <div className={styles.rank}>1</div>
            <div className={styles.mark_name}>{list1}</div>
          </li>
          <li>
            <div className={styles.rank}>2</div>
            <div className={styles.mark_name}>{list2}</div>
          </li>
          <li>
            <div className={styles.rank}>3</div>
            <div className={styles.mark_name}>{list3}</div>
          </li>
          <li>
            <div className={styles.rank}>4</div>
            <div className={styles.mark_name}>{list4}</div>
          </li>
          <li>
            <div className={styles.rank}>5</div>
            <div className={styles.mark_name}>{list5}</div>
          </li>
        </ul>
      );
    }
  }

  const getList = () => {
    setLoading(true);
    setList("obtained");
    let keywordform = new FormData();
    keywordform.append("keyword", keyword);
    setMany1("최대 두개");
    setMany2("선택 가능");

    axios
      .post(`http://127.0.0.1:5000/trademark/api/keyword_transmit`, keywordform)
      .then(response => {
        console.log("response : ", JSON.stringify(response, null, 2));

        console.log(response);

        var data_split = JSON.stringify(response["data"]["results"]);

        setCategory1("");
        setName1("");
        setSimilarCode1("");
        setCategory2("");
        setName2("");
        setSimilarCode2("");
        setCategory3("");
        setName3("");
        setSimilarCode3("");
        setCategory4("");
        setName4("");
        setSimilarCode4("");
        setCategory5("");
        setName5("");
        setSimilarCode5("");
        setCategory6("");
        setName6("");
        setSimilarCode6("");
        setCategory7("");
        setName7("");
        setSimilarCode7("");
        setCategory8("");
        setName8("");
        setSimilarCode8("");
        setCategory9("");
        setName9("");
        setSimilarCode9("");
        setCategory10("");
        setName10("");
        setSimilarCode10("");

        if (data_split.split("category")[1] !== undefined) {
          setCategory1(
            data_split.split("category")[1].split(",")[0].split('"')[2]
          );
          setName1(data_split.split("name")[1].split(",")[0].split('"')[2]);
          setSimilarCode1(
            data_split.split("similiar_code")[1].split(",")[0].split('"')[2]
          );
        }

        if (data_split.split("category")[2] !== undefined) {
          setCategory2(
            data_split.split("category")[2].split(",")[0].split('"')[2]
          );
          setName2(data_split.split("name")[2].split(",")[0].split('"')[2]);
          setSimilarCode2(
            data_split.split("similiar_code")[2].split(",")[0].split('"')[2]
          );
        }

        if (data_split.split("category")[3] !== undefined) {
          setCategory3(
            data_split.split("category")[3].split(",")[0].split('"')[2]
          );
          setName3(data_split.split("name")[3].split(",")[0].split('"')[2]);
          setSimilarCode3(
            data_split.split("similiar_code")[3].split(",")[0].split('"')[2]
          );
        }

        if (data_split.split("category")[4] !== undefined) {
          setCategory4(
            data_split.split("category")[4].split(",")[0].split('"')[2]
          );
          setName4(data_split.split("name")[4].split(",")[0].split('"')[2]);
          setSimilarCode4(
            data_split.split("similiar_code")[4].split(",")[0].split('"')[2]
          );
        }

        if (data_split.split("category")[5] !== undefined) {
          setCategory5(
            data_split.split("category")[5].split(",")[0].split('"')[2]
          );
          setName5(data_split.split("name")[5].split(",")[0].split('"')[2]);
          setSimilarCode5(
            data_split.split("similiar_code")[5].split(",")[0].split('"')[2]
          );
        }

        if (data_split.split("category")[6] !== undefined) {
          setCategory6(
            data_split.split("category")[6].split(",")[0].split('"')[2]
          );
          setName6(data_split.split("name")[6].split(",")[0].split('"')[2]);
          setSimilarCode6(
            data_split.split("similiar_code")[6].split(",")[0].split('"')[2]
          );
        }

        if (data_split.split("category")[7] !== undefined) {
          setCategory7(
            data_split.split("category")[7].split(",")[0].split('"')[2]
          );
          setName7(data_split.split("name")[7].split(",")[0].split('"')[2]);
          setSimilarCode7(
            data_split.split("similiar_code")[7].split(",")[0].split('"')[2]
          );
        }

        if (data_split.split("category")[8] !== undefined) {
          setCategory8(
            data_split.split("category")[8].split(",")[0].split('"')[2]
          );
          setName8(data_split.split("name")[8].split(",")[0].split('"')[2]);
          setSimilarCode8(
            data_split.split("similiar_code")[8].split(",")[0].split('"')[2]
          );
        }

        if (data_split.split("category")[9] !== undefined) {
          setCategory9(
            data_split.split("category")[9].split(",")[0].split('"')[2]
          );
          setName9(data_split.split("name")[9].split(",")[0].split('"')[2]);
          setSimilarCode9(
            data_split.split("similiar_code")[9].split(",")[0].split('"')[2]
          );
        }

        if (data_split.split("category")[10] !== undefined) {
          setCategory10(
            data_split.split("category")[10].split(",")[0].split('"')[2]
          );
          setName10(data_split.split("name")[10].split(",")[0].split('"')[2]);
          setSimilarCode10(
            data_split.split("similiar_code")[10].split(",")[0].split('"')[2]
          );
        }

        setLoading(false);
      })
      .catch(error => {
        console.log("failed", error);
        alert("일치하는 검색 결과가 없습니다!");
        setList("none");
        setLoading(false);
      });
  };

  const getCode1 = () => {
    // setMode("welcome");
    // setLoading(true);
    setState("defined");
    if (many1 === "최대 두개" && many2 === "선택 가능") {
      setMany1(similar_code1);
      setMany2("");
    } else if (many1 === similar_code1 && many1 !== "") {
      setMany2("");
    } else if (many1 !== "" && many2 === "") {
      setMany2(similar_code1);
    } else if (many1 !== "" && many2 !== "") {
      if (many2 === similar_code1) {
        setMany1(many2);
        setMany2("");
      } else {
        setMany1(many2);
        setMany2(similar_code1);
      }
    }
  };

  const getCode2 = () => {
    // setMode("welcome");
    // setLoading(true);
    setState("defined");
    if (many1 === "최대 두개" && many2 === "선택 가능") {
      setMany1(similar_code2);
      setMany2("");
    } else if (many1 === similar_code2 && many1 !== "") {
      setMany2("");
    } else if (many1 !== "" && many2 === "") {
      setMany2(similar_code2);
    } else if (many1 !== "" && many2 !== "") {
      if (many2 === similar_code2) {
        setMany1(many2);
        setMany2("");
      } else {
        setMany1(many2);
        setMany2(similar_code2);
      }
    }
  };

  const getCode3 = () => {
    // setMode("welcome");
    // setLoading(true);
    setState("defined");
    if (many1 === "최대 두개" && many2 === "선택 가능") {
      setMany1(similar_code3);
      setMany2("");
    } else if (many1 === similar_code3 && many1 !== "") {
      setMany2("");
    } else if (many1 !== "" && many2 === "") {
      setMany2(similar_code3);
    } else if (many1 !== "" && many2 !== "") {
      if (many2 === similar_code3) {
        setMany1(many2);
        setMany2("");
      } else {
        setMany1(many2);
        setMany2(similar_code3);
      }
    }
  };

  const getCode4 = () => {
    // setMode("welcome");
    // setLoading(true);
    setState("defined");
    if (many1 === "최대 두개" && many2 === "선택 가능") {
      setMany1(similar_code4);
      setMany2("");
    } else if (many1 === similar_code4 && many1 !== "") {
      setMany2("");
    } else if (many1 !== "" && many2 === "") {
      setMany2(similar_code4);
    } else if (many1 !== "" && many2 !== "") {
      if (many2 === similar_code4) {
        setMany1(many2);
        setMany2("");
      } else {
        setMany1(many2);
        setMany2(similar_code4);
      }
    }
  };

  const getCode5 = () => {
    // setMode("welcome");
    // setLoading(true);
    setState("defined");
    if (many1 === "최대 두개" && many2 === "선택 가능") {
      setMany1(similar_code5);
      setMany2("");
    } else if (many1 === similar_code5 && many1 !== "") {
      setMany2("");
    } else if (many1 !== "" && many2 === "") {
      setMany2(similar_code5);
    } else if (many1 !== "" && many2 !== "") {
      if (many2 === similar_code5) {
        setMany1(many2);
        setMany2("");
      } else {
        setMany1(many2);
        setMany2(similar_code5);
      }
    }
  };

  const getCode6 = () => {
    // setMode("welcome");
    // setLoading(true);
    setState("defined");
    if (many1 === "최대 두개" && many2 === "선택 가능") {
      setMany1(similar_code6);
      setMany2("");
    } else if (many1 === similar_code6 && many1 !== "") {
      setMany2("");
    } else if (many1 !== "" && many2 === "") {
      setMany2(similar_code6);
    } else if (many1 !== "" && many2 !== "") {
      if (many2 === similar_code6) {
        setMany1(many2);
        setMany2("");
      } else {
        setMany1(many2);
        setMany2(similar_code6);
      }
    }
  };

  const getCode7 = () => {
    // setMode("welcome");
    // setLoading(true);
    if (similar_code7 === "") {
      setState("undefined");
      setLoading(false);
      // setList("none");
    } else {
      setState("defined");
      if (many1 === "최대 두개" && many2 === "선택 가능") {
        setMany1(similar_code7);
        setMany2("");
      } else if (many1 === similar_code7 && many1 !== "") {
        setMany2("");
      } else if (many1 !== "" && many2 === "") {
        setMany2(similar_code7);
      } else if (many1 !== "" && many2 !== "") {
        if (many2 === similar_code7) {
          setMany1(many2);
          setMany2("");
        } else {
          setMany1(many2);
          setMany2(similar_code7);
        }
      }
    }
  };

  const getCode8 = () => {
    // setMode("welcome");
    // setLoading(true);
    if (similar_code8 === "") {
      setState("undefined");
      setLoading(false);
      // setList("none");
    } else {
      setState("defined");
      if (many1 === "최대 두개" && many2 === "선택 가능") {
        setMany1(similar_code8);
        setMany2("");
      } else if (many1 === similar_code8 && many1 !== "") {
        setMany2("");
      } else if (many1 !== "" && many2 === "") {
        setMany2(similar_code8);
      } else if (many1 !== "" && many2 !== "") {
        if (many2 === similar_code8) {
          setMany1(many2);
          setMany2("");
        } else {
          setMany1(many2);
          setMany2(similar_code8);
        }
      }
    }
  };

  const getCode9 = () => {
    // setMode("welcome");
    // setLoading(true);
    if (similar_code9 === "") {
      setState("undefined");
      setLoading(false);
      // setList("none");
    } else {
      setState("defined");
      if (many1 === "최대 두개" && many2 === "선택 가능") {
        setMany1(similar_code9);
        setMany2("");
      } else if (many1 === similar_code9 && many1 !== "") {
        setMany2("");
      } else if (many1 !== "" && many2 === "") {
        setMany2(similar_code9);
      } else if (many1 !== "" && many2 !== "") {
        if (many2 === similar_code9) {
          setMany1(many2);
          setMany2("");
        } else {
          setMany1(many2);
          setMany2(similar_code9);
        }
      }
    }
  };

  const getCode10 = () => {
    // setMode("welcome");
    // setLoading(true);
    if (similar_code10 === "") {
      setState("undefined");
      setLoading(false);
      // setList("none");
    } else {
      setState("defined");
      if (many1 === "최대 두개" && many2 === "선택 가능") {
        setMany1(similar_code10);
        setMany2("");
      } else if (many1 === similar_code10 && many1 !== "") {
        setMany2("");
      } else if (many1 !== "" && many2 === "") {
        setMany2(similar_code10);
      } else if (many1 !== "" && many2 !== "") {
        if (many2 === similar_code10) {
          setMany1(many2);
          setMany2("");
        } else {
          setMany1(many2);
          setMany2(similar_code10);
        }
      }
    }
  };

  const getManyCode = () => {
    if (many1 === "최대 두개") {
      alert("유사군코드를 선택해주세요.");
    } else {
      setMode("welcome");
      setLoading(true);
      setState("defined");
      if (many2 === "") {
        setCode(many1);
      } else {
        setCode(many1 + "," + many2);
      }
    }
  };

  const searchCode = () => {
    setMode("search");
    setKeyword("");
    setMany1("");
    setMany2("");
  };

  if (list === "obtained") {
    _list = (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className={styles.table_block}>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th className={styles.th1}>Category</th>
                      <th className={styles.th2}>Name</th>
                      <th className={styles.th3}>Similar group code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr onClick={getCode, setSimilarCode({similar_code1})}>
                     */}
                    <tr onClick={getCode1}>
                      <td className={styles.td1} id="td1">
                        {category1}
                      </td>
                      <td className={styles.td2} id="td2">
                        {name1}
                      </td>
                      <td className={styles.td3} id="td3">
                        {similar_code1}
                      </td>
                    </tr>
                    <tr onClick={getCode2}>
                      <td className={styles.td1} id="td1">
                        {category2}
                      </td>
                      <td className={styles.td2} id="td2">
                        {name2}
                      </td>
                      <td className={styles.td3} id="td3">
                        {similar_code2}
                      </td>
                    </tr>
                    <tr onClick={getCode3}>
                      <td className={styles.td1} id="td1">
                        {category3}
                      </td>
                      <td className={styles.td2} id="td2">
                        {name3}
                      </td>
                      <td className={styles.td3} id="td3">
                        {similar_code3}
                      </td>
                    </tr>
                    <tr onClick={getCode4}>
                      <td className={styles.td1} id="td1">
                        {category4}
                      </td>
                      <td className={styles.td2} id="td2">
                        {name4}
                      </td>
                      <td className={styles.td3} id="td3">
                        {similar_code4}
                      </td>
                    </tr>
                    <tr onClick={getCode5}>
                      <td className={styles.td1} id="td1">
                        {category5}
                      </td>
                      <td className={styles.td2} id="td2">
                        {name5}
                      </td>
                      <td className={styles.td3} id="td3">
                        {similar_code5}
                      </td>
                    </tr>
                    <tr onClick={getCode6}>
                      <td className={styles.td1} id="td1">
                        {category6}
                      </td>
                      <td className={styles.td2} id="td2">
                        {name6}
                      </td>
                      <td className={styles.td3} id="td3">
                        {similar_code6}
                      </td>
                    </tr>
                    <tr onClick={getCode7}>
                      <td className={styles.td1} id="td1">
                        {category7}
                      </td>
                      <td className={styles.td2} id="td2">
                        {name7}
                      </td>
                      <td className={styles.td3} id="td3">
                        {similar_code7}
                      </td>
                    </tr>
                    <tr onClick={getCode8}>
                      <td className={styles.td1} id="td1">
                        {category8}
                      </td>
                      <td className={styles.td2} id="td2">
                        {name8}
                      </td>
                      <td className={styles.td3} id="td3">
                        {similar_code8}
                      </td>
                    </tr>
                    <tr onClick={getCode9}>
                      <td className={styles.td1} id="td1">
                        {category9}
                      </td>
                      <td className={styles.td2} id="td2">
                        {name9}
                      </td>
                      <td className={styles.td3} id="td3">
                        {similar_code9}
                      </td>
                    </tr>
                    <tr onClick={getCode10}>
                      <td className={styles.td1} id="td1">
                        {category10}
                      </td>
                      <td className={styles.td2} id="td2">
                        {name10}
                      </td>
                      <td className={styles.td3} id="td3">
                        {similar_code10}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button className={styles.table_button} onClick={getManyCode}>
              {many1}&nbsp;
              {many2}
            </button>
          </div>
        )}
      </div>
    );
  }

  var _post = null;
  var _circle = null;
  _post = (
    <button className={styles.code_inquery} onClick={searchCode}>
      유사군코드 조회
      <FontAwesomeIcon icon={faCheckCircle} />
    </button>
  );

  _circle = <FontAwesomeIcon icon={faCheckCircle} />;

  if (text === "") {
    _circle = <FontAwesomeIcon icon={faCheckCircle} />;
  } else {
    _circle = (
      <span className={styles.green_circle}>
        <FontAwesomeIcon icon={faCheckCircle} />
      </span>
    );
  }

  if (state === "defined") {
    _post = (
      <span className={styles.code_complete}>
        {code}
        <FontAwesomeIcon icon={faCheckCircle} className="circle" />
      </span>
    );
  }

  var _article = null;
  if (mode === "result") {
    _article = <div>{loading ? <Loading /> : <ResultZone />}</div>;
  }

  if (mode === "welcome") {
    _article = (
      <div>
        <div className={styles.input_zone}>
          <div className={styles.similarity_check_btn}>
            <p>{_post}</p>
          </div>
          <div className={styles.input_name}>
            <p>
              <input
                type="text"
                placeholder="상표명 입력"
                value={text}
                onKeyPress={onKeyPress1}
                onChange={processText}
              />
              {/* <FontAwesomeIcon icon={faCheckCircle} />  */}
              {_circle}
            </p>
          </div>
          <div className={styles.similarity_check_btn}>
            <p>
              <button onClick={sendData}>유사도검사</button>
            </p>
          </div>
        </div>
        {<Banner />}
      </div>
    );
  }

  if (mode === "search") {
    _article = (
      <div>
        <div className={styles.input_zone}>
          <div className={styles.input_name}>
            <p>
              <input
                type="text"
                value={keyword}
                onKeyPress={onKeyPress2}
                onChange={processKeyword}
                placeholder="상품 명칭 입력"
              />
            </p>
          </div>
          <div className={styles.similarity_check_btn}>
            <p>
              <button onClick={getList}>유사군코드 조회</button>
            </p>
          </div>
        </div>

        <div className={styles.list_zone}>{_list}</div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className={styles.title_zone}>
        <div onClick={toWelcomeChange}>
          <Title></Title>
        </div>
      </div>
      {_article}
    </div>
  );
}
export default App;
