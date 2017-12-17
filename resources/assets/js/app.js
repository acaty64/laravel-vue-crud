new Vue({
	el: '#crud',
	created: function() {
		this.getKeeps();
	},
	data: {
		keeps: [],
		newKeep: '',
		errors: [],
	},
	methods: {
		getKeeps: function () {
			var urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response => {
				this.keeps = response.data
			}); 
		},
		deleteKeep: function (keep) {
			var url = 'tasks/' + keep.id ;
			axios.delete(url).then(response => {  // Eliminamos
				this.getKeeps(); // Listamos
				toastr.success('Eliminado correctamente registro: '+keep.id); // Enviamos el mensaje
			});
		},
		createKeep: function () {
			var url = 'tasks';
			axios.post(url, {
				keep: this.newKeep
			}).then(response => {
				this.getKeeps();
				this.newKeep = '';
				this.errors = [];
				$('#create').modal('hide');
				toastr.success('Nueva tarea creada con éxito');
			}).catch(error => {
				this.errors = error.response.data;
			});
		}
	},
});