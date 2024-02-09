/*
export default (await import('vue')).defineComponent({
name: "theLogin",
data() {
return {
username: "",
password: "",
error: ""
};
},
methods: {
login() {
let params = {
action: "getDistribuidor",
identificador: this.username,
senha: this.password
};

this.$http //axios
.post("/login_crm.php", params)
.then((response) => {
//console.log(response.data);
if (response.data.id)
this.$parent.distribuidor = response.data;
})
.catch((error) => {
console.error("Não foi possível ler base de dados! ", error);
});


}
}
});
function __VLS_template() {
// @ts-ignore
[username, password, login];
return {};
}
*/