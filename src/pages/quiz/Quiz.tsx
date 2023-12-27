import { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import MobileFrame from '../../components/moblieFrame';
import question from '../../data/questions';

const Wrapper = styled.div`
  background: var(---, #ff58b8);
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

// 맨위 뒤로가기랑 제목 있는 곳

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 100px;
  margin-top: 1.5rem;
`;
const BackButton = styled(IoIosArrowBack)`
  color: #ffffff;
  font-size: 1.5rem;
  margin-right: 2.5rem;
  cursor: pointer;
`;
const Title = styled.h2`
  color: #fff;
  text-shadow: 4px 4px 3px rgba(255, 255, 255, 0.5);
  font-family: DNF Bit Bit v2;
  font-size: 1.2rem;
`;
const SpecialText = styled.span`
  color: var(---, #9cff00);
  font-family: 'DNF Bit Bit v2';
  font-size: 1.2rem;
  font-style: normal;
  line-height: normal;
`;

interface ITest {
  width: number;
}

const ProgressBar = styled.div`
  width: 350px;
  height: 12px;
  background-color: #d9d9d9;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.8rem;
  margin-top: 20px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${(props: ITest) => props.width}%;
  height: 12px;
  padding: 0;
  text-align: center;
  background-color: #9cff00;
  color: #111;
`;
const Timer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`;
const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;
const Difficulty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 30px;
  color: #fff;
  font-weight: bold;
  font-family: DNF Bit Bit v2;
  font-size: 1.2rem;
  padding-left: 100px;
`;

const Qimg = styled.img`
  width: 350px;
  height: 250px;
`;
const Qtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  font-style: normal;
  line-height: normal;
  padding-bottom: 30px;
  color: #fff;
  font-weight: bold;
  font-family: DNF Bit Bit v2;
  font-size: 1.2rem;
`;
const Answers = styled.div`
  padding-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Aoption = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 30px;

  border-radius: 10px;

  padding: 10px;
  cursor: pointer;
  margin: 10px;
`;
const RadioInput = styled.input``;
const CustomButton = styled.button`
  width: 200px;
  background-color: #ffffff;
  color: black;
  font-weight: 400;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: #9cff00;
  }
`;

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [correctAnswersCount, setCorrectAnswersCount] = useState(1);
  const [time, setTime] = useState(20);
  const [isButtonDisabled, setButtonDisabled] = useState(false); // State to control button disable
  const maxItem = 10;

  const availableItem = currentQuestionIndex + 1;
  const getSeconds = (time) => {
    const seconds = Number(time % 60);
    if (seconds < 10) {
      return '0' + String(seconds);
    } else {
      return String(seconds);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);

      if (time === 0 && currentQuestionIndex < question.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
        setTime(20);
      } else if (currentQuestionIndex === 10) {
        console.log('Quiz completed!');
      }
    };
  });

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
    if (!isButtonDisabled) {
      setButtonDisabled(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTime(20);
        setButtonDisabled(false);
      }, 300);
    }
  };

  const handleRadioChange = (event) => {
    if (question[currentQuestionIndex].ans === event.target.value) {
      setCorrectAnswersCount(correctAnswersCount + 1);
      console.log(correctAnswersCount);
    } else {
      console.log('wrong');
    }
  };
  const handleBackClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption('');
      setTime(20);
      setButtonDisabled(false);
    } else {
      // 첫번째 문제에서는 뒤로 돌아 갈 수 없으니까
    }
  };
  const currentQuestion = question[currentQuestionIndex];

  const { title, img, options } = currentQuestion;

  return (
    <MobileFrame>
      <Wrapper>
        <Top>
          <BackButton onClick={handleBackClick} />
          <Title>
            2023 <SpecialText>MZ</SpecialText> 트렌드 능력고사
          </Title>
        </Top>
        <ProgressBar>
          <Progress width={(availableItem * 100) / maxItem} />
        </ProgressBar>
        <TopWrapper>
          <Difficulty>Stage {currentQuestionIndex + 1} 난이도</Difficulty>
          <Timer>{getSeconds(time)}</Timer>
        </TopWrapper>
        <Qtitle>{title}</Qtitle>
        <Qimg src={img} alt="Question Image" />
        <Answers>
          {options.map((option, index) => (
            <Aoption key={index}>
              <RadioInput type="radio" name="answer" />

              <CustomButton
                onClick={() => handleAnswerClick(option)}
                disabled={isButtonDisabled}
                value={option}
                onChange={handleRadioChange}
              >
                {option}
              </CustomButton>
            </Aoption>
          ))}
        </Answers>
      </Wrapper>
    </MobileFrame>
  );
}