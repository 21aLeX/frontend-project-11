const getModal = () => `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModal" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel"></h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">      
    </div>
    <div class="modal-footer">
      <a class="btn btn-primary full-article" role="button" target="_blank" rel="noopener noreferrer"></a>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
    </div>
  </div>
</div>
</div>`;
export default getModal;
// критично ли то что я модалку вставляю целым куском кода?
