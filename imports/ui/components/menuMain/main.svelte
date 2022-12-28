<script>
    import CategoryList from './categoryList.svelte';
    import ItemSearch from './itemSearch.svelte';
    import ItemList from './itemList.svelte';

</script>

<main>
    <!-- main start -->
    <div class="content d-flex flex-column container-fluid">
        <div class="main-header-section d-flex flex-column " >
            <ItemSearch />
            <CategoryList />
        </div><!-- main-header-section -->

        <div class="main-content-section simplebar" >
            <ItemList />
        </div><!-- end main-content-section -->
    </div>
</main>
<!-- main end -->
