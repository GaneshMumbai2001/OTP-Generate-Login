
      /* 2️⃣ Initialize Magic Instance */
      let magic = new Magic("pk_live_06A22B76624BC2E5");

      /* 3️⃣ Implement Render Function */
      const render = async () => {
        const isLoggedIn = await magic.user.isLoggedIn();

        /* Show login form if user is not logged in */
        let html = `
          <h1>Please sign up or login</h1>
          <form onsubmit="handleLogin(event)">
            <input type="tel" name="phone" required="required" placeholder="Enter your phone #" />
            <button type="submit">Send</button>
          </form>
        `;

        if (isLoggedIn) {
          /* Get user metadata including phone */
          const userMetadata = await magic.user.getMetadata();
          html = `
            <h1>Current user: ${userMetadata.phoneNumber}</h1>
            <button onclick="handleLogout()">Logout</button>
          `;
        }

        document.getElementById("app").innerHTML = html;
      };

      /* 4️⃣ Implement Login Handler */
      const handleLogin = async (e) => {
        e.preventDefault();
        const phoneNumber = new FormData(e.target).get("phone");
        if (phoneNumber) {
          /* One-liner login 🤯 */
          await magic.auth.loginWithSMS({ phoneNumber });
          render();
        }
      };

      /* 5️⃣ Implement Logout Handler */
      const handleLogout = async () => {
        await magic.user.logout();
        render();
      };