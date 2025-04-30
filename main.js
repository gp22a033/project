let selectedGrade = ""; // 選択された学年を格納

// 学年選択時の処理
function toggleSelect() {
    const select = document.getElementById('middle-school-select');
    select.style.display = select.style.display === 'none' ? 'inline' : 'none';
}

function selectGrade(grade) {
    if (grade) {
        selectedGrade = grade;
        alert(`${grade}を選択しました！`);

        // プルダウンを非表示にする
        document.getElementById('middle-school-select').style.display = "none";

        // 学年選択画面を非表示にして、切り替えボタンと生徒画面を表示
        document.getElementById('grade-selection').style.display = "none";
        document.getElementById('toggle-btn').style.display = "block";
        document.getElementById('student-view').style.display = "block";
    }
}

// 画面切り替え
function toggleView() {
    const studentView = document.getElementById('student-view');
    const teacherView = document.getElementById('teacher-view');

    if (studentView.style.display === 'none') {
        studentView.style.display = 'block';
        teacherView.style.display = 'none';
    } else {
        studentView.style.display = 'none';
        teacherView.style.display = 'block';
    }
}

// ミッション開始
async function startMission() {
    document.getElementById('question-container').style.display = "block";
    document.querySelector('#student-view button').style.display = "none"; // スタートボタン非表示

    try {
        const response = await fetch('questions.json');
        const questions = await response.json();

        // 学年によって問題を絞り込む（キー名を英語に修正）
        const filteredQuestions = questions.filter(question => question.grade === selectedGrade);

        if (filteredQuestions.length > 0) {
            loadQuestion(filteredQuestions[0]); // 最初の問題を表示
        } else {
            alert("選択した学年に対応する問題がありません。");
        }
    } catch (error) {
        console.error('問題の読み込みに失敗しました:', error);
    }
}

// 問題を画面に表示
function loadQuestion(question) {
    document.getElementById('question-text').innerText = question.question;

    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = "";

    question.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.innerText = choice;
        btn.onclick = () => checkAnswer(index, question.correctIndex, question.explanation);
        choicesContainer.appendChild(btn);
    });
}

// 回答チェック
function checkAnswer(selectedIndex, correctIndex, explanation) {
    if (selectedIndex === correctIndex) {
        alert("正解！\n" + explanation);
    } else {
        alert("不正解...\n" + explanation);
    }
}

// （仮）進捗表示機能
function showProgress() {
    const container = document.getElementById('progress-container');
    container.innerHTML = "<p>進捗データ機能はこれから実装します。</p>";
}
