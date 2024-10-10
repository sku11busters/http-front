export default function changeTicketStatus(
  mainContainer,
  currentTicket,
  ticketStatus,
  ticketStatusCheckbox,
  serverUrl,
) {
  if (mainContainer.querySelector('.modal')) return;

  ticketStatusCheckbox.classList.toggle('hidden');
  let { status } = ticketStatus.dataset;
  const isHidden = ticketStatusCheckbox.classList.contains('hidden');
  if (isHidden) status = false;
  if (!isHidden) status = true;

  const data = {
    id: currentTicket.dataset.id,
    status,
  };

  const xhrUpdateTicket = new XMLHttpRequest();
  xhrUpdateTicket.open('POST', `${serverUrl}/?method=updateById&id=${currentTicket.dataset.id}`);
  xhrUpdateTicket.setRequestHeader('Content-Type', 'application/json');
  document.body.style.cursor = 'wait';

  xhrUpdateTicket.addEventListener('load', () => {
    if (xhrUpdateTicket.status >= 200 && xhrUpdateTicket.status < 300) {
      try {
        setTimeout(() => {
          document.body.style.cursor = '';
        }, 500);
      } catch (e) {
        console.error(e);
      }
    }
  });

  xhrUpdateTicket.send(JSON.stringify(data));
}
