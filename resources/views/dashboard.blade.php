@extends('app')

@section('content')

<div id="crud" class="row">
	<div class="col-sm-12">
		<h1 class="page-header">CRUD LARAVEL y VUEjs</h1>
	</div>
	<div class="col-sm-7">
		<a href="#" class="btn btn-primary pull-right" data-toggle="modal" data-target="#create">
			Nueva Tarea
		</a>
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Id</th>
					<th>Tarea</th>
					<th>
						&nbsp;
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="keep in keeps">
					<td width="10px">@{{ keep.id }}</td>
					<td>@{{ keep.keep }}</td>
					<td width="10px">
						<a href="#" class="btn btn-warning btn-sm">Editar</a>
					</td>
					<td width="10px">
						<a href="#" class="btn btn-danger btn-sm" v-on:click.prevent="deleteKeep(keep)">Eliminar</a>
					</td>
				</tr>
			</tbody>
		</table>		
		@include('create')
	</div>
	<div class="col-sm-5">
		<pre>
			@{{ $data }}
		</pre>
	</div>	
</div>

@endsection