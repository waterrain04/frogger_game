    const time = document.getElementById('time-left');
    const result = document.getElementById('result');
    const start =document.getElementById('start');
    const restart = document.getElementById("restart");
    const squares =document.querySelectorAll('.grid div');
    const logsLeft = document.querySelectorAll('.log-left');
    const logsRight = document.querySelectorAll('.log-right');
    const carLeft = document.querySelectorAll('.car-left');
    const carRight = document.querySelectorAll('.car-right');
    const end = document.querySelectorAll('.ending-block');
    const pause = document.getElementById('pause')
    const gameOver = document.getElementById("gameOver")
    const audio = document.getElementById("audio")
    const how = document.querySelector('.how');
    const info = document.querySelector('.info');
    const x = document.querySelector('.x')
    let currentIndex=76;
    let timer = 20;
    let logInterval;
    let carsInterval;
    let timerInterval
    squares[currentIndex].classList.add('frog');

    function moveFrog(e){ 
      squares[currentIndex].classList.remove('frog');
        switch(e.key){
        case 'a':
        case 'A': 
        case 'ArrowLeft':
          if(currentIndex % 9 !==0)currentIndex--;
          console.log(currentIndex)
          break;
        case 'd':
        case 'D':
        case 'ArrowRight':

          if(currentIndex % 9 <9-1)
          currentIndex++;
          console.log(currentIndex)
          break;
        case 's':
        case 'S':
        case 'ArrowDown':

          if(currentIndex + 9 < 9*9)
          currentIndex +=9
          console.log(currentIndex)
          break;
        case 'w':
        case 'W':
        case 'ArrowUp':

          if(currentIndex - 9 >=0)
          currentIndex -=9
          console.log(currentIndex)
          break;
      }
      document.getElementById("jump").play();
      squares[currentIndex].classList.add('frog')
      console.log(currentIndex)
      lose()
      win()
    }

    function moveLogLeft(log){
            switch(true){
              case log.classList.contains('l1'):
              log.classList.remove('l1')
              log.classList.add('l2')
              break;
              case log.classList.contains('l2'):
              log.classList.remove('l2')
              log.classList.add('l3') 
              break;
              case log.classList.contains('l3'):
              log.classList.remove('l3')
              log.classList.add('l4')
              break;
              case log.classList.contains('l4'):
              log.classList.remove('l4')
              log.classList.add('l5') 
              break;
              case log.classList.contains('l5'):
              log.classList.remove('l5')
              log.classList.add('l1') 
              break;
          }win()
          lose()
    }

    function moveLogRight(log){
      switch(true){
        case log.classList.contains('l1'):
        log.classList.remove('l1')
        log.classList.add('l5')
        break;
        case log.classList.contains('l2'):
        log.classList.remove('l2')
        log.classList.add('l1') 
        break;
        case log.classList.contains('l3'):
        log.classList.remove('l3')
        log.classList.add('l2')
        break;
        case log.classList.contains('l4'):
        log.classList.remove('l4')
        log.classList.add('l3') 
        break;
        case log.classList.contains('l5'):
        log.classList.remove('l5')
        log.classList.add('l4') 
        break;
    }
    win()
    lose()
    }
    function autoMoveLogs(){
      logsLeft.forEach( log =>{moveLogLeft(log)})
      logsRight.forEach( log =>{moveLogRight(log)})

    }

    function moveCarLeft(car){
      switch(true){
        case car.classList.contains('c1'):
        car.classList.remove('c1')
        car.classList.add('c2')
        break;
        case car.classList.contains('c2'):
        car.classList.remove('c2')
        car.classList.add('c3') 
        break;
        case car.classList.contains('c3'):
        car.classList.remove('c3')
        car.classList.add('c1')
        break;
    }
    win()
    lose()
    }
    function moveCarRight(car){
    switch(true){
    case car.classList.contains('c1'):
    car.classList.remove('c1')
    car.classList.add('c3')
    break;
    case car.classList.contains('c2'):
    car.classList.remove('c2')
    car.classList.add('c1') 
    break;
    case car.classList.contains('c3'):
    car.classList.remove('c3')
    car.classList.add('c2')
    break;
    }
    win()
    lose()
    }

    function autoMoveCars(){
      carLeft.forEach( car =>{moveCarLeft(car)})
      carRight.forEach( car =>{moveCarRight(car)})
    }
    function lose(){
      if(squares[currentIndex].classList.contains('c1') 
        && squares[currentIndex].classList.contains('frog')){ 
        document.getElementById("death").play()
        result.innerText = "YOU LOSE!"
        clearInterval(logInterval)
        clearInterval(carsInterval)
        clearInterval(timerInterval)
        pause.disabled=true;
        squares[currentIndex].classList.remove('frog');
        squares[76].classList.add('frog')
        gameOver.style.display ="block"
        document.removeEventListener('keyup',moveFrog)
      }
      if((squares[currentIndex].classList.contains("l5")||squares[currentIndex].classList.contains("l4"))&& squares[currentIndex].classList.contains("frog")){
        result.innerText = "YOU LOSE!"
        document.getElementById("death").play()
        pause.disabled=true;
        clearInterval(logInterval)
        clearInterval(carsInterval)
        clearInterval(timerInterval)
        squares[currentIndex].classList.remove('frog');
        squares[76].classList.add('frog')
        gameOver.style.display ="block"
        document.removeEventListener('keyup',moveFrog)

      }
    }

    function win(){
        if(squares[currentIndex].classList.contains("ending-block")
        && squares[currentIndex].classList.contains("frog")){
          result.innerText ="YOU WIN!"
          document.getElementById('winner').play();
          gameOver.innerHTML = "<h1>YOU WIN!</h1>"
          gameOver.style.display ="block"
          pause.disabled=true;
          clearInterval(logInterval)
          clearInterval(carsInterval)
          clearInterval(timerInterval)
        document.removeEventListener('keyup',moveFrog)
        }
    }
    function countDown(){
      if(timer>0){
        timer--
        time.innerText =timer;

      }
      else{
        result.innerText = "YOU LOSE!"
        document.getElementById("death").play()
        gameOver.style.display ="block"
        clearInterval(logInterval)
        clearInterval(carsInterval)
        clearInterval(timerInterval)
        squares[currentIndex].classList.remove('frog');
        squares[76].classList.add('frog')
        document.removeEventListener('keyup',moveFrog)
      }
    }
    start.onclick = () =>{
      document.getElementById('play').play();
      logInterval =setInterval(autoMoveLogs,1000)
      carsInterval=setInterval(autoMoveCars,1000)
      timerInterval = setInterval(countDown,1000)
      start.disabled=true;
      pause.disabled=false;
      document.addEventListener('keyup',moveFrog)
    }
    pause.onclick = () =>{
      clearInterval(logInterval)
      clearInterval(carsInterval)
      clearInterval(timerInterval)
      document.removeEventListener('keyup',moveFrog)
      start.disabled=false;
      pause.disabled=true;
    }
    restart.onclick = () =>{
      window.location.reload();
      document.getElementById('play').play();
    }

    how.onclick = () =>{
      info.style.display="block";
    }
    
    x.onclick =()=>{
      info.style.display="none";
    }