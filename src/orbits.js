const planData = {
  1: {
    name: 'BASIC PLAN',
    yield: '0.2%',
    period: 'hourly for 96 hours',
    investment: '$10.00 - $500.00 USD',
  },
  2: {
    name: 'STANDARD PLAN',
    yield: '0.4%',
    period: 'hourly for 96 hours',
    investment: '$501.00 - $1000.00 USD',
  },
  3: {
    name: 'ADVANCED PLAN',
    yield: '2.4%',
    period: 'daily for 30 days',
    investment: '$1001.00 - $5000.00 USD',
  },
  4: {
    name: 'PRO PLAN',
    yield: '4.2%',
    period: 'daily for 30 days',
    investment: '$5001.00 - $10000.00 USD',
  },
  5: {
    name: 'VIP PLAN',
    yield: '6.1%',
    period: 'weekly for 12 weeks',
    investment: '$10001.00 - $25000.00 USD',
  },
  6: {
    name: 'ELITE PLAN',
    yield: '8.3%',
    period: 'weekly for 12 weeks',
    investment: '$25001.00 - $50000.00 USD',
  },
  7: {
    name: 'LEGEND PLAN',
    yield: '10%',
    period: 'monthly for 6 months',
    investment: '$50001.00 - $100000.00 USD',
  },
  8: {
    name: 'ULTIMATE PLAN',
    yield: '12%',
    period: 'monthly for 6 months',
    investment: '$100001.00 - $Unlimited USD',
  },
};

function setupPlanInteractions() {
  const planets = document.querySelectorAll('.planet');
  const detailsCard = document.querySelector('.plan-details-content');

  if (!planets.length || !detailsCard) {
    return;
  }

  const nameEl = detailsCard.querySelector('.plan-name-basic');
  const yieldEl = detailsCard.querySelector('h3');
  const periodEl = detailsCard.querySelector('p:not(.principal-included, .investment-range p)');
  const investmentEl = detailsCard.querySelector('.investment-range p:last-child');

  planets.forEach(planet => {
    planet.addEventListener('mouseover', () => {
      const planId = planet.dataset.plan;
      const data = planData[planId];

      if (data) {
        nameEl.textContent = data.name;
        yieldEl.textContent = data.yield;
        periodEl.textContent = data.period;
        investmentEl.textContent = data.investment;
      }
    });
  });
}

export { setupPlanInteractions };
