import { savePost, showsPost, editPost, signOut, likePost, prueba } from '../firebase/fbFunction.js';
import { getAuth, onSnapshot, serverTimestamp } from '../Firebase/firebaseImport.js';


const auth = getAuth();

const clickPost = (div) => {
   const userName = auth.currentUser;
   const actualDate = serverTimestamp();
   const postValue = div.querySelector('#inputPost').value;
   savePost(postValue, userName.email, actualDate)
      .then(()=> {
         showsPaintPost();
         const cleanPost = document.querySelector('#inputPost');
         cleanPost.value= '';
})
}
export const showsPaintPost = () => {
         showsPost()
      .then((res) => res.forEach((e) => { 
         divContainerPost.appendChild(paintPost(e.id, e.data()));
         const colorLike = divContainerPost.querySelector('#like');
         if (e.data().like.includes(auth.currentUser.uid)) {
            colorLike.classList.add('paint');
            colorLike.classList.remove('paintBlue');
         } else {
            colorLike.classList.remove('paint')
            colorLike.classList.add('paintBlue');
         }
           divEcotraveler.appendChild(divContainerPost);
      })
      )
   }

const divEcotraveler = document.createElement('div');
divEcotraveler.setAttribute("class", "gridDivEcotraveler")
const divContainerPost = document.createElement('div');
divContainerPost.setAttribute("class", "gridDivContainerPost")
export default () => { 
  const viewEcotraveler = `
  <div class='containerWall'>
   <div class='gridHeaderWall'>
    <h1 class='tittleAccount' id='tittleWall'>EcoTraveler</h1>
    <img src='img/cerrar-sesion.png' alt='signOut' class='signOut' id='signOutIcon'/>
     </div>
        <div class='containerPost' id='formPost'>
       <textarea name='post' id='inputPost' rows= 4 placeholder='Comparte tu experiencia' autofocus></textarea>
       </div>
       <div class='containerIcons'>
     <button class='btnPublic' id='publicBtn'>Publicar</button>
     <div id='publicPost'></div>
     </div>
     </div>`;
     
   
  divEcotraveler.innerHTML = viewEcotraveler;
  
  const btnPost = divEcotraveler.querySelector('#publicBtn');
  // creamos un evento al boton publicar
  btnPost.addEventListener('click', () => clickPost(divEcotraveler));

  const btnSignOut = divEcotraveler.querySelector('#signOutIcon');
  btnSignOut.addEventListener('click', () => signOut(auth));

  return divEcotraveler;
};


export const paintPost = (idPost, post) =>{
   const divPost = document.createElement('div');
   let historyPost =  `
   <div class='containerWallPost'>
      <div class='containerPost' id='postSpace'>
        <div class='userName'>${post.userName}</div>
         <textarea name='post' id='textAreaPost' readonly="readonly">${post.post}</textarea>
      </div>
      <div class='modalContainer' id='containerModal'>
      <div class='modal' id='modal'>
      <textarea name='post' id='editPost' rows= 4 placeholder='Comparte tu experiencia' autofocus>${post.post}</textarea>
       <button class='btnEditPost' id='publicBtnEditPost'>Editar</button>
      </div>
     </div>
      <div class='containerIconsPost'>
        <img src='img/heart (1).png' alt='like' class='icons like' id='like' >
        <img src='img/pencil (1).png' alt='editPost' class='icons' id='edit'>
        <img src='img/bin.png' alt='deletePost' class='icons' ></img id='delete'>
      </div>

   </div>
   `;

   divPost.innerHTML = historyPost;
//   pruebaedit.innerHTML= historyPost;
const btnEdit = divPost.querySelector('#edit');
const postEd = divPost.querySelector('#textAreaPost');
const modal = divPost.querySelector('#containerModal');
const edit = divPost.querySelector('#publicBtnEditPost');
btnEdit.addEventListener('click', () => {
   postEd.classList.add('hide');
   modal.classList.add('show');
})
edit.addEventListener('click', () => {
   modal.classList.remove('show');
   const postEdited = divPost.querySelector('#editPost').value;
   editFunction(idPost, postEdited);
   postEd.value = postEdited;
   postEd.classList.remove('hide');
})

const btnLike = divPost.querySelector('#like');
btnLike.addEventListener('click', () => {
     showsPost()
     .then((res) => res.forEach((e) => {
        if (e.id === idPost) {
          if(e.data().like.includes(auth.currentUser.uid)) {
            like(idPost, auth.currentUser.uid, true)
          } else {
            like(idPost, auth.currentUser.uid, false)
          }
        }
   }))
});

    return divPost; 
}
window.onload = showsPaintPost;


const editFunction = (id, post) => {
   editPost( id, post);
}

const like = (idPost, idUser, isLike ) => {
 likePost(idPost, idUser, isLike)
}

