import React,{useState} from 'react';

let styles={
  item:{ 
    border:'1px solid gray',
    borderRadius:16,
    margin:8,
    padding:8,
    flexGrow:1
  },
  wrapper:{
    margin:8,
    padding:8,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    border:'1px solid gray',
    borderRadius:16,
  },
  contentContainer:{
    marginLeft:8,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
  },
  content:{
    display:"flex",
    justifyContent: "center"
  }
}




    function CatItem({img}){
      return(
              <li>
                <img src={img} style={{width:"200px", border:"2px solid #f00"}}/>
              </li>
            )
      }

    const Favorites = function ({favorites}){
      
      return(
        <ul className="favorites" style={styles.content}>
          {favorites.map((img)=>{
            return <CatItem key={img} img={img} title={img}/>
          })}
        </ul>
      )
    }

    const Card =function({title,dec}){
      return(
        <div style={styles.item}>
          <h2>{title}</h2>
          <p>{dec}</p>
        </div>
      )
    }

    const Title = ({children})=>{
      return(<>
        {children}
        </>
        )}


  const Form = ({handleFormSubmit,handleInputChange,value,errorMessage})=>{
    return(
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" value={value} placeholder="영어 대사를 입력해주세요" onChange={handleInputChange} />
        <button type="submit">생성</button>
        <p style={{color:"red"}}>{errorMessage}</p>
      </form>
    )
  }

  
    
  const MainCard =({handleHeartClick,img})=>{

    return(
      <div className="main-card">
        <img
          src={img}
          alt="고양이"
          width="400px"
        />
        <button onClick={handleHeartClick} >버튼</button>
      </div>

    )
  }




  function Basic() {
    const jsonLocalStorage = {
      setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));//JSON.stringify 는 문자로 받아줌
      },
      getItem: (key) => {
        return JSON.parse(localStorage.getItem(key));//문자와딘 숫자나 배열을 숫자로 받아줌
      },
    };

    console.log(jsonLocalStorage)

    const IMG1="https://img.megabox.co.kr/SharedImg/2023/02/02/fXKirFwFuRC7UAxC8TUmsbqbIga2fKCK_420.jpg";
    const IMG2="https://img.megabox.co.kr/SharedImg/2022/10/27/KyM9M62zht16gWm8cArDqiD8oXWNByTz_420.jpg";
    const IMG3="https://img.megabox.co.kr/SharedImg/2023/03/02/RyVhtmW6ro5wftIY5aOSVqf9m6uGdCbi_420.jpg";

    
    const [counterState, setCounterState]=useState(jsonLocalStorage.getItem('counter'));
    console.log("카운터의 값", counterState)
    const [favorites,setFavorites] = useState(jsonLocalStorage.getItem('favorites')|| []);
    const [value,setValue]=useState('');
    const [imgChange,setImgChange]=useState('https://img.megabox.co.kr/SharedImg/2023/02/02/UmgxlJgwWqM6ueiP32rhQhr2Cpq2GA5P_420.jpg')
    const [errorMessage, setErrorMessage]=useState('');

     const handleInputChange=(e)=>{
      console.log(e.target.value.toUpperCase())
      const valueText = (e.target.value).toUpperCase()
      setValue(valueText)



      //한글입력시에 영어로 입력할것
     
      const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
      const userValue=e.target.value;
      console.log(includesHangul(userValue))//한글이 있으면 true

      if(includesHangul(userValue)){
        setErrorMessage('한글은 입력할수 없습니다.')
      }else{
        setErrorMessage('')
      }
    }

    const handleFormSubmit=(event)=>{
      event.preventDefault();//새로고침막음
      console.log("폼 전송됨")
      const nextCounter=counterState + 1;
      setCounterState(nextCounter)
      jsonLocalStorage.setItem("counter",nextCounter)

      setErrorMessage("")//초기화를 미리하면 아래 if문에서 else를 안해도된다
      if(value === ""){
        setErrorMessage("빈 값으로 만들수 없습니다.")
      }
    }

     const handleHeartClick=()=>{
      //event.preventDefault();
      console.log("하트 눌렀음")
      setImgChange('https://img.megabox.co.kr/SharedImg/2023/02/09/DisAMP8RHmWtMPLRamfLXx4CiXdstLar_420.jpg')
      const nextFavorites=[...favorites, imgChange]
      setFavorites(nextFavorites)
      jsonLocalStorage.setItem('favorites',nextFavorites)
    }


    

  return (
      <div className='container'>
        <Title><h1>반갑습니다. 리액트 {counterState}번째 입니다</h1></Title> {/* 안에 텍스트도 props로 넘길수 있다 --> children라는 이름으로 넘어간다 */}
        <Title><h3>반갑습니다. 리액트입니다</h3></Title> 
        <Form handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} value={value} errorMessage={errorMessage}/>
        <Favorites favorites={favorites}/>
        <MainCard  handleHeartClick={handleHeartClick} img={imgChange}/>
         <div style={styles.wrapper}>
        <Card title='서울입니다' dec='서울 설명글입니다.'/>
        <Card title='부산입니다' dec='부산 설명글입니다.'/>
        </div>
      </div>
    )
  }

export default Basic