var count = 2;
var nomor = 0;
var menu;
const renderPosts = (posts) => {
  var output = "";
  $(".tabelmakanan tr").remove();
  let myObj_serialized = JSON.stringify(posts);
  localStorage.setItem("myObj", myObj_serialized);
  // console.log(localStorage);

  posts.forEach((post, index) => {
    output += `<tr>
            <td>${index + 1}</td>
            <td>${post.makanan}</td>
            <td><button onClick="productEdit(this)" data-id="${
              post.id
            }" class="editbutton">EDIT</button>  <button onClick="productDelete(this)" data-id="${
      post.id
    }" class="deletebutton">DELETE</button></td>
          </tr>`;
  });
  $(".tabelmakanan").append(output);
  // datalokal(post);
};

function onDocumentFinish() {
  const tabelmakanan = $(".tabelmakanan");

  // Baca file json
  fetch("menu.json")
    .then((response) => response.json())
    .then((data) => {
      menu = data;
      renderPosts(data);
      // console.log(output)
    });

  // Menambahkan data makanan
  document.getElementById("formSubmit").onsubmit = function (form) {
    form.preventDefault();
    let item = {
      nomor: "",
      makanan: "",
      edit: "",
      isItemValid: function () {
        if (this.makanan !== "") {
          return true;
        }
        return false;
      },
      addToTable: function () {
        const tbody = document
          .getElementById("tableItem")
          .querySelector("tbody");
        const newRow = document.createElement("tr");
        const nomorCol = document.createElement("td");
        nomorCol.appendChild(document.createTextNode(this.nomor));
        const makananCol = document.createElement("td");
        makananCol.appendChild(document.createTextNode(this.makanan));

        const editCol = document.createElement("td");
        editCol.innerHTML = `<button onClick="productEdit(this)" class="editbutton">EDIT</button>  <button onClick="productDelete(this)" class="deletebutton">DELETE</button>`;
        editCol.type = "submit";
        editCol.name = "formbtn";
        editCol.appendChild(document.createTextNode(this.edit));

        newRow.appendChild(nomorCol);
        newRow.appendChild(makananCol);
        newRow.appendChild(editCol);
        menu.push({
          id: menu.length + 1,
          makanan: this.makanan,
        });
        swal(
          "Sudah Siap!",
          "Makanan yang anda input sudah ditambahkan",
          "success"
        );
        renderPosts(menu);
        // console.log(nomorCol);
        // console.log(makananCol);
      },
      fillProperty: function (dataSource) {
        nomor = nomor + 1;
        item.nomor = nomor;
        item.makanan = dataSource.target["addMenu"].value;
        // item.edit = '';
        // console.log(nomor);
        // console.log(addMenu);
      },
    };
    item.fillProperty(form);
    if (item.isItemValid()) {
      document.getElementById("formSubmit").reset();
      item.addToTable();
    } else {
      swal("ERROR!", "TIDAK BOLEH KOSONG!", "error");
    }
  };
}

// Function menghapus data makanan
function productDelete(r) {
  swal({
    title: "Apakah anda yakin?",
    text: "Nanti nama makanan kamu hilang loh!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      var i = $(r).data().id;
      menu = menu.filter((item) => item.id !== i);
      renderPosts(menu);
      swal("Berhasil!", "Penghapusan data sukses!", "success", {
        icon: "success",
      });
    } else {
      swal("OKE!", "Penghapusan data dibatalkan!", "info");
    }
  });
}

// Function mengubah data makanan
function productEdit(r) {
  swal({
    title: "Ganti nama makanan ?",
    text: "Anda akan mengganti makanan ini!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willUpdate) => {
    if (willUpdate) {
      swal("Masukan makanan kamu disini!", {
        content: "input",
      }).then((value) => {
        updatemakanan = value;
        updates(updatemakanan);
        // console.log(updatemakanan)
      });
      var updatemakanan = value;

      function updates(updatemakanan) {
        if (updatemakanan.trim() === "" || updatemakanan === null) {
          swal("ERROR", "Tolong Isi Dengan Benar!", "error");
        } else {
          var i = $(r).data().id;
          var itemindex = menu.findIndex((item) => item.id === i);
          menu[itemindex].makanan = updatemakanan;
          renderPosts(menu);
          // console.log(itemindex)
          swal("Berhasil!", "Nama makanan kamu sudah diganti!", "success", {
            icon: "success",
          });
        }
      }
    } else {
      swal("OKE!", "Pengeditan data dibatalkan!", "info");
    }
  });
}

function randomizecounter(data) {
  let counter = 0;
  data.forEach((post) => {
    if (post.makanan != null) {
      counter += 1;
    }
  });
  // console.log(counter);
  return counter;
}

// Function randomize
function randomize() {
  let myObj_deserialized = JSON.parse(localStorage.getItem("myObj"));

  if (randomizecounter(myObj_deserialized) >= 3) {
    var randomItem1 =
      myObj_deserialized[Math.floor(Math.random() * myObj_deserialized.length)];
    // console.log(myObj_deserialized)
    var randomItem2 =
      myObj_deserialized[Math.floor(Math.random() * myObj_deserialized.length)];
    // console.log(myObj_deserialized)
    while (
      randomItem1 == randomItem2 ||
      randomItem1 == randomItem3 ||
      randomItem2 == randomItem3
    ) {
      var randomItem2 =
        myObj_deserialized[
          Math.floor(Math.random() * myObj_deserialized.length)
        ];
      // console.log(myObj_deserialized)
    }
    var randomItem3 =
      myObj_deserialized[Math.floor(Math.random() * myObj_deserialized.length)];
    // console.log(myObj_deserialized)
    while (
      randomItem1 == randomItem2 ||
      randomItem1 == randomItem3 ||
      randomItem2 == randomItem3
    ) {
      var randomItem3 =
        myObj_deserialized[
          Math.floor(Math.random() * myObj_deserialized.length)
        ];
      // console.log(myObj_deserialized)
    }
    // let randomItembr = JSON.parse(randomItem);
    document.getElementById("breakfast").innerHTML =
      "Breakfast : " + randomItem1.makanan;
    document.getElementById("lunch").innerHTML =
      "Lunch : " + randomItem2.makanan;
    document.getElementById("dinner").innerHTML =
      "Dinner : " + randomItem3.makanan;
  } else {
    swal(
      "ERROR",
      "Jumlah makanan anda belum cukup untuk menggunakan fitur ini!",
      "error"
    );
  }
}
