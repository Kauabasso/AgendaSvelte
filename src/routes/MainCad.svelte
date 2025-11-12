<main>
  <div class="cadastro">
     <slot></slot>
  </div>
</main>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  
  .cadastro {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    width: 300px;
    min-height: 400px;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    word-wrap: break-word;
    text-align: center;
  }

  </style>