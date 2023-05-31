import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Social = () => {
  const [amis, setAmis] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/boggle/php/social.php')
      .then(response => {
        const data = response.data;
        console.log(data)
        setAmis(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Mes amis :</h1>
      <ul>
        {amis.map(ami => (
          <li key={ami.id}>
            <a href={`go_to_account.php?target=${ami.id}`}>{ami.pseudo}</a>
            {ami.acceptation === 1 && (
              <div>
                {ami.pseudo} vous a demandé en ami
                <form method="POST" action="accepter.php">
                  <input type="number" name="id_ami" value={ami.id} style={{ display: 'none' }} />
                  <label htmlFor="accepter">Accepter</label>
                  <input type="checkbox" id="accepter" name="acceptation"
                  value="accepter"
                  onClick={() => submitForm('accepter')}
                  style={{ display: 'none' }}
                />

                <label htmlFor="refuser">Refuser</label>
                <input
                  type="checkbox"
                  id="refuser"
                  name="acceptation"
                  value="refuser"
                  onClick={() => submitForm('refuser')}
                  style={{ display: 'none' }}
                />
              </form>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
);
            }
function submitForm(acceptation) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'accepter.php';

  const idInput = document.createElement('input');
  idInput.type = 'number';
  idInput.name = 'id_ami';
  idInput.value = acceptation === 'accepter' ? '1' : '0';
  idInput.style.display = 'none';
  form.appendChild(idInput);

  form.submit();
}

export default Social