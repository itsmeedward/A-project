window.addEventListener("scroll",function(){

    let header = document.querySelector('header')
    header.classlist.toggle('sticky',window.scrollY > 0)
})