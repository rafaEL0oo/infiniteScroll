const divContainer = document.querySelector('.container')
const PageLikeBtn = document.querySelector('.liked-status')
const likePostDiv = document.querySelector('.liked-posts-page')
const likePagePostsDiv = document.querySelector('.liked-posts__images')
const removeLikedPosts = document.querySelector('.remove-all-likes')

window.onload = function() {
    let startingPosts = document.querySelectorAll('.post-image img')
    startingPosts.forEach((item)=>{
        GetRandomPic(item)
    })
    
};
  

window.addEventListener('scroll',()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement

    if((clientHeight+scrollTop) > (scrollHeight - 100)){
        let NewPost = document.createElement('div')
        NewPost.classList.add('post')
        NewPost.innerHTML = `
        <div class="post-image">
            <img src="images/loading.gif" alt="">
        </div>
        <div class="social">
            <img id="like" src="images/likeButton.png" alt="like button">
            <img src="images/commentButton.png" alt="comment button">
        </div>
        <hr>`
        divContainer.appendChild(NewPost)
        GetRandomPic(NewPost.querySelector('.post-image img'))
    }
})


divContainer.addEventListener('click',(e)=>{
    if(e.target.id == "like"){
        e.target.style.background = "grey"
        let likedPost = e.target.parentElement.parentElement
        likedPost = likedPost.querySelector('.post-image img').src
        // likedPosts.push(post.querySelector('.post-image img').src)
        AddLikedPost(likedPost)
    }
})


PageLikeBtn.addEventListener('click',()=>{
    let actualLikedPosts = JSON.parse(localStorage.getItem('liked-images')) || []
    console.log(actualLikedPosts)
    if(actualLikedPosts.length == 0 && PageLikeBtn.textContent == "Liked posts"){
        alert("You didn't like any photo!")
    }else{
        divContainer.classList.toggle('disabled')
        likePostDiv.classList.toggle('disabled')
        removeLikedPosts.classList.toggle('disabled')
        if(!likePostDiv.classList.contains('disabled')){
            PageLikeBtn.querySelector('p').textContent = "Back"
            renderLikedPosts()
        }else{
            PageLikeBtn.querySelector('p').textContent = "Liked posts"
            likePagePostsDiv.innerHTML = ""
        }
    }
})

removeLikedPosts.addEventListener('click',()=>{
    localStorage.setItem('liked-images', '[]')
    likePagePostsDiv.innerHTML = ""
})


const GetRandomPic = (image) =>{
    fetch("https://random.imagecdn.app/500/500")
    .then((data)=>{
        image.src = data.url
    })
}


const renderLikedPosts = () =>{
    let actualLikedPosts = JSON.parse(localStorage.getItem('liked-images'))
    console.log(actualLikedPosts)
    actualLikedPosts.forEach((post)=>{
        let ImageDiv = document.createElement('div')
        ImageDiv.classList.add('liked__images')
        ImageDiv.innerHTML = `<img src="${post}" alt="">`
        likePagePostsDiv.append(ImageDiv)
    })
}


const AddLikedPost = (likedPost)=>{
    let actualLikedPosts = JSON.parse(localStorage.getItem('liked-images')) || []
    actualLikedPosts.push(likedPost)
    console.log(actualLikedPosts)
    localStorage.setItem('liked-images', JSON.stringify(actualLikedPosts))
}