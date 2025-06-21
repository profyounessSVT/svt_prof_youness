fetch('cours.json')
  .then(response => response.json())
  .then(data => afficherQCM(data.qcm));

function afficherQCM(qcms) {
  const container = document.getElementById("qcm-container");
  qcms.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${q.question}</p>
      ${q.choices.map((c, i) => `
        <label>
          <input type="radio" name="q${index}" value="${i}">
          ${c}
        </label><br>
      `).join('')}
      <button onclick="verifier(${index}, ${q.answer})">Vérifier</button>
      <p id="result${index}"></p>
      <hr>
    `;
    container.appendChild(div);
  });
}

function verifier(index, bonneReponse) {
  const choix = document.querySelector(`input[name="q${index}"]:checked`);
  const resultat = document.getElementById(`result${index}`);
  if (!choix) {
    resultat.innerText = "Veuillez sélectionner une réponse.";
    resultat.style.color = "orange";
    return;
  }
  if (parseInt(choix.value) === bonneReponse) {
    resultat.innerText = "Bonne réponse !";
    resultat.style.color = "green";
  } else {
    resultat.innerText = "Mauvaise réponse.";
    resultat.style.color = "red";
  }
}
