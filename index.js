const app = document.getElementById("app")  //Documento é um objeto, Pegar o elemento do documento pelo ID 'app" do HTML

// array para guardar os valores, pois não esta utilizando Banco de dados.
const users = [
  {
    email: 'test@gmail.com',
    phone: '8888888',
    ref: 100,
    refBy: null   // "refBy" significa referenciado por quem
  },
  
  {
    email: 'Nah@gmail.com',
    phone: '8888888',
    ref: 200,
    refBy: 100   // Referenciado pelo usuario anterior que possue a ref: 100

  },
  
  {
    email: 'testih@gmail.com',
    phone: '8888888',
    ref: 300,
    refBy: 100   // Referenciado pelo usuario anterior que possue a ref: 100


  }

]
const getUser = (userData) => {
  return users.find((user) => {  // "find" procurar dentro dos usuarios quem tiver o email que foi digitado
  return user.email == userData.email  // os dois simbolo igual"==" são para comparar os email 
})
}

const getTotalSubscribers = (userData) => {
const subs = users.filter((user) => { // "filter" Filtrar os dados que são verdadeiros
return user.refBy ==userData.ref
})
return subs.length
}

const ShowInvite = (userData) => {
app.innerHTML = `
  <main>
    <h3>Inscrção confirmada!</h3>

    <p>
      Convide mais pessoas e concorra a prêmios! <br/>
      Compartilhe o link e acompanhe as incrições:
    </p>

    <div class="input-group">
      <label for="link">
        <img src= "link.svg" alt="link icon">
        </label>
<input type="text" id="link" value="https://evento.com?ref=${userData.ref}"disabled> 
    </div>
  </main>
  
  <section class="stats">
<h4>
${getTotalSubscribers(userData)}
</h4>
    <p>
      Inscrições feitas
      </p>
      </section>
  `

  app.setAttribute('class', 'page-invite')
  updateImagelinks()

}

const saveUser = (userData) => {
  const newUser = {
    ...userData,
    ref: Math.round(Math.random() * 4000),   //Utilizado neste projeto para criar numeros aleatorios para usuario que possue a ref: 100
    refBy:100
  }
  users.push(newUser)
  console.log(users)
  return newUser
  
}

const formAction = () => {
  const form = document.getElementById('form')
  form.onsubmit = (event) => {
    event.preventDefault() //"preventDefault" Bloquear para não enviar o formulario
    const formData = new FormData(form)
    const userData = {
      email: formData.get('email'),
      phone: formData.get('phone')

    }

    const user = getUser(userData)   // encontrou o usuario
    if(user) {   
    ShowInvite(user)

    } else{  // não encontrou o usuario
      const newUser = saveUser (userData)
      showInvite(newUser)

    }

  }
}

const updateImagelinks = () => {
  document.querySelectorAll('img').forEach((img) => {  /* pesquisar no documento para cada seletor "img" e para cada um rodar uma imagem */
  if(img.src.includes('githubusercontent')){
    return
  }
  const src = img.getAttribute('src')

  img.src= `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`

  })

}

const startApp = () => {
  const content = `
       <main>
        <section class="about">
          <!-- "about" sobre o envento -->
          <div class="section-header">
            <h2>
              Sobre o evento
            </h2>
            <span class= "badge">AO VIVO</span>
              </div>

              <p>
                Um evento criado por e para desenvolvedores apaixonados por inovação e pelo compartilhamento de conhecimento. Vamos explorar as últimas tendências em desenvolvimento de software, arquiteturas de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
                <br></br>De 15 a 17 de março | Das 18h às 20h | Online & Gratuito
</p>
</section>

<section class="registration">
  <h2>Inscrição</h2>

  <form id="form">
    <div class="input-wrapper">
      <div class="input-group">
        <label for"email">
                          <img src="mail.svg" alt="email icon">
                          </label>
                          <input type="email" id="email" name="email"
                          placeholder="E-mail">
      </div>

      <div class="input-group">
        <label for"phone">
                          <img src="phone.svg" alt="phone icon">
                          </label>
                          <input type="phone" id="phone" name="phone"
                          placeholder="Telefone">
      </div>
    </div>
    
    <button>
    confirmar
      <img src="arrow.svg" alt="Arrow right">
      </button>
  </form>
</section>
</main>
  `

  app.innerHTML = content
  app.setAttribute('class', 'page-start')
  updateImagelinks ()
  formAction()
}
startApp()

//showInvite({
   //email: 'test@gmail.com',
    //phone: '888',
    //ref: 100
//})

document.querySelector("header").onclick = () => startApp () // Adiicionado botão para poder "voltar" na pagina ao clicar em "startApp"