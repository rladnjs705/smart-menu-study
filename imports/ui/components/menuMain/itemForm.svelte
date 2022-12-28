  <!-- slot modal-header start -->
  <h4 >메뉴 추가</h4>
  <!-- slot modal-header end -->

  <!-- slot modal-body start -->          
  <div class="modal-body" >
    <div class="mb-3 ">
      <label for="recipient-name" class="col-form-label">메뉴 이름:</label>
      <input type="text" class="form-control" id="recipient-name">
      <!-- <div class="invalid-feedback was-validated">이름을 입력해 주세요.</div> -->
    </div>
    <div class="mb-3">
      <label for="recipient-name" class="col-form-label">메뉴 카테고리:</label>
      <select name="menu-cateogry-select" class="form-select">
        <option value="id1">Berger</option>
        <option value="id2">Pizza</option>
        <option value="id3">Side</option>
      </select>
    </div>            
    <div class="mb-3">
      <label for="message-text" class="col-form-label">메뉴 가격:</label>
      <input type="text" class="form-control" id="recipient-name">
    </div>
    <div class="mb-3">
      <label for="message-text" class="col-form-label">메뉴 이미지:</label>
      <input type="file" class="form-control" id="recipient-name">
    </div>
    <div class="mb-3">
      <img src="../images/food_img/KjdgrhOok.png" class="card-img-top" alt="">
    </div>              
  </div>
  <!-- slot modal-body end -->      
  
  <!-- slot modal-footer start -->          
  <div class="modal-footer d-flex flex-column align-items-stretch" >
    <button type="button" class="btn btn-primary pt-3 pb-3">메뉴 추가</button>
  </div>
  <!-- slot modal-footer end -->          
  