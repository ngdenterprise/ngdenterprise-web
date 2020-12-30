<template>
	<div class="container" :class="`${align} ${$mq === 'mobile' ? '' : $mq}`" :style="{ height: $mq === 'mobile' ? 'auto' : `${content.iconPcHeight}px` }">
		<div class="content-wrapper" :class="align">
			<div class="title" :class="$mq">
				{{ content.title }}
			</div>
			<div class="tagline" :class="$mq">
				{{ content.tagline }}
			</div>
			<div class="link-container">
				<a v-for="(link, index) in content.links" 
					:key="index" 
					:href="link.url" 
					class="link" :class="$mq"
				>
					{{link.name}}
				</a>
			</div>
		</div>
		<img v-if="$mq === 'mobile'" :src="content.icon" 
			:style="{ 
				height: `${content.iconMobileHeight}px`
			}" 
		/>
		<img v-else :src="content.icon"
			:style="{
				height: `${content.iconPcHeight}px`,
				position: 'absolute',
				left: content.align === 'right' ? `${content.pcShift * -1}px` : 'unset',
				right: content.align === 'left' ? `${content.pcShift * -1}px` : 'unset',
			}"
		/>
	</div>
	
</template>

<script>
export default {
	name: 'Content',
	props: {
		align: String,
		content: Object
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
	display: flex;
	align-items: center;
	margin-top: 120px;

	&.mobile {
		flex-direction: column-reverse;
		margin-top: 40px;
	}

	&.right.pc {
		flex-direction: row-reverse;
	}
}

.content-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;

	&.left {
		align-items: flex-start;
		text-align: left;

		.link {
			margin-right: 48px;
		}
	}

	&.right {
		align-items: flex-end;
		text-align: right;

		.link {
			margin-left: 48px;
		}
	}
}

.link {
	color: '#00E599';
	font-size: 16px;
	font-weight: 400;
}





.mobile {
	align-items: center;
	text-align: center;
}

.title {
	font-size: 67px;
	font-weight: 600;

	&.mobile {
		margin-top: 20px;
		font-size: 39px;
	}
}

.tagline {
	margin-top: 16px;
	font-size: 16px;
	font-weight: 400;

	&.mobile {
		font-size: 12px;
	}
}

.link-container {
	display: flex;
}

.link {
	margin-top: 16px;
	font-size: 16px;

	&.mobile {
		margin: 20px 9px;
		font-size: 12px;
	}
}


</style>
