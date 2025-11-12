<script lang="ts">

import cadastro from '../cadastro/+page.svelte';
</script>
  


<cadastro />


<ul class="todos">
		{#each data.todos as todo (todo.id)}
			<li>
				{todo.description}
			</li>
		{/each}
	</ul>