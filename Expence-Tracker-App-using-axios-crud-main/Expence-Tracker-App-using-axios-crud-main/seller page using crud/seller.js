
var submit = document.getElementById('submit');
var total=document.getElementById('totalPrice');
var rate=0;
submit.addEventListener('click', (e) => {
    e.preventDefault();
    try {
        var product = document.getElementById('product').value;
        var price = document.getElementById('price').value;
        var option = document.getElementById('option').value;
        var obj = { option, product, price };
        postData(obj);
        
    } catch (err) {
        console.log(err)
    }
})


//post data in backend
async function postData(obj) {
    try {
      const response=await axios.post('https://crudcrud.com/api/cb6c41e105b14ed492c20366e4dffb70/userDeatils', obj)
            showUserDataOnScreen(response.data);
            
        
    } catch (error) {
        console.log(error)
    }
}

//show data on screen
async function showUserDataOnScreen(user) {
    try {
        let fo = document.getElementById('food');
        let elec = document.getElementById('electronic');
        let med = document.getElementById('medicine')
        document.getElementById('product').value = '';
        document.getElementById('price').value = '';
        rate +=parseInt(user.price);
        total.textContent=`Total Price- ${rate}`;
    
        if (user.option === 'food') {
            let childhtml = `<li id=${user._id}>${user.product}-${user.price}-${user.option}
            <button onclick= deleteUser('${user._id}','${user.price}','${user.option}')>Delete Item</li>`
            fo.innerHTML = fo.innerHTML + childhtml;

        } else if (user.option === 'electronic') {
            let childhtml = `<li id=${user._id}>${user.product}-${user.price}-${user.option}
         <button onclick= deleteUser('${user._id}','${user.price}','${user.option}')>Delete Item</li>`
             elec.innerHTML = elec.innerHTML + childhtml;

         } else if(user.option==='Medicine') {
             let childhtml = `<li id=${user._id}>${user.product}-${user.price}-${user.option}
         <button onclick= deleteUser('${user._id}','${user.price}','${user.option}')>Delete Item</li>`
             med.innerHTML = med.innerHTML + childhtml;            
        }
        
     } catch (error) {
        console.log(error)
    }

}

//delete userfuncton
async function deleteUser(user_id, price,option) {
    try {
     const del= await axios.delete(`https://crudcrud.com/api/cb6c41e105b14ed492c20366e4dffb70/userDeatils/${user_id}`)
            removeUserFromScreen(user_id,price,option);
        
    } catch (error) {
        console.log(error)
    }

}

async function removeUserFromScreen(user_id,price,option) {
    try {
        let child = document.getElementById(user_id);
        let foo = document.getElementById('food');
        let elec = document.getElementById('electronic');
        let med = document.getElementById('medicine');
        
        if(option==='food'){
         foo.removeChild(child);
        }else if(option==='electronic'){
            elec.removeChild(child);
        }else if(option==='Medicine'){
            med.removeChild(child);
         }
         rate -=parseInt(price);
         total.textContent=rate;
        } catch (error) {
        console.log('This removeUserFromScreen is not working');
    }
}

/// show data when page is refresh
 window.addEventListener('DOMContentLoaded', async () => {
    try {
    const response=await axios.get('https://crudcrud.com/api/cb6c41e105b14ed492c20366e4dffb70/userDeatils')
            for (var i = 0; i < response.data.length; i++) {
                showUserDataOnScreen(response.data[ i ]);
                console.log(response);
            }
        
    } catch (error) {
        console.log(error)
    }

})

