<?php add_action( 'rm_page_sections', 'rm_init_home_page', 0 );
if ( ! function_exists( 'rm_init_home_page' ) ) {
    function rm_init_home_page() {
        $id = /* page_id */;
        if ( is_page( $id ) ) {
            echo '<div class="ramon-page ramon-home">';
                /* Your functions */
            echo '</div>';
        }
    }
}