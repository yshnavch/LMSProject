var videolist = ['https://www.youtube.com/embed/0ik6X4DJKCc','https://www.youtube.com/embed/mPd2aJXCZ2g', 'https://www.youtube.com/embed/wK2cBMcDTss', 'https://www.youtube.com/embed/i37KVt_IcXw']
var lessonnumber = document.querySelector('.lessonnumber')
var count = 0;
var lessonpage = document.querySelector('.lesson1');
var intro = document.querySelector('.intro');
var introopen = document.querySelector('.introopen');
introopen.addEventListener('click', showintropage);
function showintropage(){
    intro.style.display = 'unset';
    lessonpage.style.display = 'none'
}


var openlesson = document.querySelector('.lessonopen');
openlesson.addEventListener('click', showlessonpage);
function showlessonpage(){
    intro.style.display = 'none';
    lessonpage.style.display = 'unset'
}

var lesson = document.querySelector('.lessonvideo')

var next = document.querySelector('.next');

next.addEventListener('click', gotonext);

function gotonext(){
    if(count == 3){
        next.style.display = 'none'
    }
    else{
        count +=1;
        setTimeout(() => {lesson.src = `${videolist[count]}`;
        lessonnumber.innerHTML = `Lesson ${count+1}`
        prev.style.display = 'unset'
        if(count == 3){
            next.style.display = 'none'
        }else{
            next.style.display = 'unset'
        }
    },100)
    }
}

var prev = document.querySelector('.prev');

prev.addEventListener('click', gotoprev);

function gotoprev(){
    if(count == -1){
        //prev.style.display = 'none'
        intro.style.display = 'unset';
    lessonpage.style.display = 'none'
    }
    else{
        count -=1;
        setTimeout(() => {lesson.src = `${videolist[count]}`;
        lessonnumber.innerHTML = `Lesson ${count+1}`
        next.style.display = 'unset'
        if(count == -1){
            //prev.style.display = 'none'
            intro.style.display = 'unset';
    lessonpage.style.display = 'none'
        }else{
            prev.style.display = 'unset'
        }
    },100)
    }
}