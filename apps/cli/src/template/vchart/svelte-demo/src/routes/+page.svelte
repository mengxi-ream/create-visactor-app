<script lang="ts">
  import { onMount } from 'svelte';

  const spec = {
    data: [
      {
        id: 'barData',
        values: [
          { month: 'Monday',    sales: 22 },
          { month: 'Tuesday',   sales: 13 },
          { month: 'Wednesday', sales: 25 },
          { month: 'Thursday',  sales: 29 },
          { month: 'Friday',    sales: 38 }
        ]
      }
    ],
    type: 'bar',
    xField: 'month',
    yField: 'sales'
  };

  // `VChart` is only typed after we import it, so start with `any`
  let chart: any = null;

  onMount(() => {
    (async () => {
      const { default: VChart } = await import('@visactor/vchart');
      chart = new VChart(spec, { dom: 'chart' });
      chart.renderSync();
    })();

    return () => chart?.release();
  });
</script>

<div id="chart"></div>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
</p>