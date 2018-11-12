namespace Website.Widget {
    export class TopPosts {

        private _topPostsChart;
        private _divID: string;

        constructor(id: string) {
            this._divID = id;
            this.builtChart();
        }

        private builtChart() {
            let ctx = document.getElementById(this._divID)['getContext']('2d');
            this._topPostsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Windows is amazing", "Some awesome post", "Yellow", "Green", "Purple"],
                    datasets: [{
                        data: [19, 7, 5, 3, 2],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                display: false
                            }
                        }]
                    }
                }
            });
        }
    }
}