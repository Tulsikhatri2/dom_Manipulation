var empDataArray=[];
var emailId=[];

$("#formSubmit").click((a)=>{
    var fName=$("#fName").val();
    var lName=$("#lName").val();
    var eml=$("#eml").val();
    var pwd=$("#pwd").val();

    var empData={
        First_Name:fName,
        Last_Name:lName,
        Email:eml,
        Password:pwd
    }
    
    fName=""||lName==""||eml==""||pwd==""?error():submitData(empData);

      $('body').on('click','.btn-danger',function(){
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            var id=$(this).attr("id")
            // empDataArray.pop(a=>a.Email==id);
            empDataArray=empDataArray.filter((a)=>a.Email!==id)
            emailId=emailId.filter((a)=>a.Email==id);
            renderTable();
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          } 
          else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error"
            });
          }
        });
        
      })
});

function clrfield(){
    $("#fName").val("");
    $("#lName").val("");
    $("#eml").val("");
    $("#pwd").val("");
}

function renderTable(){
  var empString="";
      empDataArray.forEach(a=>{
        empString += "<tr>"
        empString += `<td style="padding:20px">${a.First_Name}</td>`
        empString += `<td style="padding:20px">${a.Last_Name}</td>`
        empString += `<td style="padding:20px">${a.Email}</td>`
        empString += `<td style="padding:20px">CryptoJS.AES.encrypt(a.password, '00000').toString()</td>`
        empString += `<td style="padding:20px"><button id="${a.Email}" class="fa fa-trash-o btn btn-danger btn-lg"></button></td>`
        empString += "</tr>"
      })
      $("#empData").html(empString);
}

function submitData(empData){
  var emailval= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(emailId.indexOf(empData.Email)!=-1)
  {
    Swal.fire({
      icon: "error",
      title: "Oops...Something went wrong!!",
      text: "THIS EMAIL IS ALREADY REGISTERED..!!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
    return;
  }
  else{
    emailId.push(empData.Email);
  }
  if(!emailval.test(empData.Email)){
    emailValidation();
  }
  else{
  empDataArray.push(empData);
    console.log(empDataArray);
    
    clrfield();

    Swal.fire({
        title: "SUCCESSFUL",
        text: "Your response have been stored!!",
        icon: "success"
      });

      renderTable();
    }
}

function error(){
  Swal.fire({
    icon: "error",
    title: "Oops...Something went wrong!!",
    text: "ALL FIELDS ARE MANDATORY",
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}

function emailValidation(){
  Swal.fire({
    icon: "error",
    title: "Oops...Something went wrong!",
    text: "ENTER A VALID EMAIL",
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}