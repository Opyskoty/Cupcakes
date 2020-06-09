

async function showCupcakes() {
  const response = await axios.get(`http://localhost:5000/api/cupcakes`);

  for (let cupcake of response.data.cupcakes){
    let item = $(addCupCakesToList(cupcake));
    $("#cupcake-list").append(item);
  }
}

function addCupCakesToList(cupcake){
  return `<div data-id="${cupcake.id}">
  <img src="${cupcake.image}" 
  width="230px" height="250px"
  alt="no image provided">
  <li>
  ${cupcake.flavor}, ${cupcake.size}, ${cupcake.rating}
  </li>
  <button class="delete btn btn-danger">Delete</button>
  </div>`
}


$("#add-new-cupcake").on("submit", async function(event) {
  event.preventDefault();

  let flavor = $("#flavor").val();
  let size = $("#size").val();
  let rating = $("#rating").val();
  let image = $("#image").val();


  const response = await axios.post('http://localhost:5000/api/cupcakes', 
                      {
                        flavor, 
                        size, 
                        rating, 
                        image
                        });

  let newCupCake = addCupCakesToList(response.data.cupcake);
  $("#cupcake-list").append(newCupCake);
  $("#add-new-cupcake").trigger("reset")
});

$("#cupcake-list").on("click", ".delete", async function(event){
  event.preventDefault();

  let $cupcake = $(event.target).closest("div");
  let cupcakeId = $cupcake.attr("data-id");
  
  await axios.delete(`http://localhost:5000/api/cupcakes/${cupcakeId}`);
  $cupcake.remove();
})


$(function () {
  showCupcakes();
})