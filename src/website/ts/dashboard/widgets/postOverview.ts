namespace Website.Widget {
    export class PostOverview {

        private _donutChart;
        private _divID: string;

        constructor(id: string) {
            this._divID = id;
            this.builtChart();
        }

        private builtChart() {
            let config = {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [
                            19,
                            2,
                            3,
                            2
                        ],
                        backgroundColor: [
                            'rgba(119, 221, 119, 1)',
                            'rgba(221, 221, 119, 1)',
                            'rgba(150, 211, 226, 1)',
                            'rgba(221, 119, 119, 1)',
                        ],
                        label: 'Dataset 1'
                    }],
                    labels: [
                        'Published',
                        'Unpublished',
                        'Private',
                        'Archived'
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                        text: 'Post Overview Donut Chart'
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    circumference: Math.PI,
                    rotation: -Math.PI
                }
            };

            var ctx = document.getElementById(this._divID)['getContext']('2d');
            this._donutChart = new Chart(ctx, config);
        }
    }
}