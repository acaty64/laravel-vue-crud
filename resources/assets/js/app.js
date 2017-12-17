new Vue({
	el: '#crud',
	created: function() {
		this.getKeeps();
	},
	data: {
		keeps: [],
		newKeep: '',
		fillKeep: { 'id': '', 'keep':'' },
		errors: [],
	},
	methods: {
		getKeeps: function () {
			var urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response => {
				this.keeps = response.data
			}); 
		},
		
		editKeep: function (keep) {
			this.fillKeep = {
				'id': keep.id,
				'keep': keep.keep
			};
			$('#edit').modal('show');
		},

		updateKeep: function (id) {
			alert('updateKeep');
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
		},

	},
});