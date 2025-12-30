export function login(req, res) {
  console.log("Received login:", req.body);
  if(req.body.username === "username" && req.body.password === "password") res.json({ success: true });
  else res.json({ success: false });
}
