<?php 
/*
 * Plugin Name: Meta SEO Inspector
 * Plugin URI: 
 * Description: SEO Meta Inspector for easy on-page inspection
 * Author: Amin
 * Author URI: https://aminmajid.com
 * Text Domain: msi
 * Version: 1.0
*/

// Add Toolbar Menus
function msi_toolbar() {
	global $wp_admin_bar;

	$args = array(
		'id'     => 'msi-analyze',
		'title'  => __( 'Analyze Page', 'msi' ),
		'href'   => '#',
	);
	$wp_admin_bar->add_menu( $args );

}
add_action( 'wp_before_admin_bar_render', 'msi_toolbar', 999 );

//Add JS for page analyzer
function msi_js() {
    wp_enqueue_script('msi-js', plugin_dir_url( __FILE__ ).'/js/msi.js');
}
add_action('wp_enqueue_scripts', 'msi_js');

//Add CSS for page analyzer styles
function msi_css() {
	wp_enqueue_style( 'msi-styles', plugin_dir_url( __FILE__ ) . '/css/msi.css' );
}
add_action( 'wp_enqueue_scripts', 'msi_css', 999 );
