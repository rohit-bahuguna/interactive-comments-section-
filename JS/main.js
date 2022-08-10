
const container = document.querySelector(".container");

function readTextFile(Method, file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
 
  rawFile.open(Method, file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

//usage:
readTextFile("GET", "../data.json", function (text) {
  var data = JSON.parse(text);

  // console.log(data.comments);

  data.comments.map((value) => {
    let main = document.createElement("div");
    main.setAttribute("class", "main");
    console.log("inn.........");
    let data = `  
        <div class="inner">
          <div class="vote">
            <div class="vote_data">
              <button><img src="./images/icon-plus.svg" alt="" class="plus" /></button>
            <p class="total_vote">${value.score}</p>
           <button> <img src="./images/icon-minus.svg" alt="" class="minus" /></button>
            </div>
          </div>
          <div class="display_data">
            <div class="display_header">
              <div class="display_header_data">
                <img src="${value.user.image.png}" alt="" />
              <p class="name">${value.user.username}</p>
              <p class="time">${value.createdAt}</p>
              </div>
              <div class="reply">
                <img src="./images/icon-reply.svg" alt="" />
                <p class="reply_text">Reply</p>
              </div>
            </div>
            <div class="comment">
              <p class="comment_text">
                ${value.content}
              </p>
            </div>
          </div>
        </div>
      `;
    const reply = document.querySelector(".reply");

    main.innerHTML = data;

    container.appendChild(main);

    if (value.replies.length > 0) {
      value.replies.map((val) => {
        let mainChild = document.createElement("div");
        mainChild.setAttribute("class", "main_child");
        let childData = `  
          <div class="inner">
            <div class="vote">
              <div class="vote_data">
                <button><img src="./images/icon-plus.svg" alt="" class="plus" /></button>
              <p class="total_vote">${val.score}</p>
             <button> <img src="./images/icon-minus.svg" alt="" class="minus" /></button>
              </div>
            </div>
            <div class="display_data">
              <div class="display_header">
                <div class="display_header_data">
                  <img src="${val.user.image.png}" alt="" />
                <p class="name">${val.user.username}</p>
                <p class="time">${val.createdAt}</p>
                </div>
                <div class="reply">
                  <img src="./images/icon-reply.svg" alt="" />
                  <p class="reply_text">Reply</p>
                </div>
              </div>
              <div class="comment">
                <p class="comment_text">
                <span class="replyingTo">@${val.replyingTo}</span>
                   ${val.content}
                </p>
              </div>
            </div>
          </div>
        `;

        mainChild.innerHTML = childData;

        container.appendChild(mainChild);
      });
    }
  });

  document.addEventListener


});

