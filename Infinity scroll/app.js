const divContainer = document.querySelector('.container')

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
            <img src="images/likeButton.png" alt="like button">
            <img src="images/commentButton.png" alt="comment button">
        </div>
        <hr>`
        divContainer.appendChild(NewPost)
        GetRandomPic(NewPost.querySelector('.post-image img'))
    }
})


const GetRandomPic = (image) =>{
    fetch("https://random.imagecdn.app/500/500")
    .then((data)=>{
        image.src = data.url
    })
}