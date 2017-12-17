new Vue({
	el: '#crud',
	created: function() {
		this.getKeeps();
	},
	data: {
		keeps: [],
		pagination: {
			'total'         :0,
            'current_page'  :0,
            'per_page'      :0,
            'last_page'     :0,
            'from'          :0,
            'to'            :0,
		},
		newKeep: '',
		fillKeep: { 'id': '', 'keep':'' },
		errors: [],
	},

	computed:{
		isActived: function () {
			return this.pagination.current_page;
		},
		pagesNumber: function () {
			// body...
		}
	},

	methods: {
		getKeeps: function () {
			var urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response => {
				this.keeps = response.data.tasks.data,
				this.pagination = response.data.pagination
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
			var url = 'tasks/' + id ;
			axios.put(url, this.fillKeep
			).then(response => {
				this.getKeeps();
				this.fillKeep = { 'id': '', 'keep':'' };
				this.errors = [];
				$('#edit').modal('hide');
				toastr.success('Tarea actualizada con éxito');
			}).catch(error => {
				this.errors = error.response.data;
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
		},

	},
});